// import { getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./temas.js";
import { obtenerApiUrl } from "./variablesEntorno.js";
import { $, getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./utils.js";

let carrito = [];
let API_URL = "";

// ============================== FUNCIONES ==============================

// cargar carrito
function cargarCarrito() {
    try {
        const data = JSON.parse(localStorage.getItem("carrito"));
        return data;
    } catch {
        return [];
    }
}

// guardar carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// obtener productos activos
async function obtenerProductosActivos() {
    const apiResponse = await fetch(`${API_URL}/api/productos?tipo=sinPaginar`);
    const data = await apiResponse.json();
    if (apiResponse.ok) {
        return data.data;
    } else {
        return [];
    }
}

// limpiar productos inactivos del carrito
function limpiarCarrito(carrito, prodActivos) {
    return carrito.filter(item => prodActivos.some(prod => prod.id === item.id && prod.activo === true));
}

// crear venta
async function crearVenta(ventaData) {
    try {
        const apiResponse = await fetch(`${API_URL}/api/ventas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ventaData),
        });

        const result = await apiResponse.json();

        if (!apiResponse.ok) {
            throw new Error(`${result.message}, (Error ${apiResponse.status})`);
        }

        return result;
    } catch (error) {
        throw error;
    }
}

// rendder carrito
function renderCarrito(tema) {
    const cont = $("carritoContainer");
    cont.innerHTML = "";
    let total = 0;
    $("detalleCompra").innerHTML = "";

    if (carrito.length === 0) {
        const contVacio = $("carritoContainerVacio");
        contVacio.innerHTML = "";
        const p = document.createElement("p");
        p.textContent = "El carrito está vacío.";
        tema === "claro" ? (p.style.color = "black") : (p.style.color = "white");
        contVacio.appendChild(p);
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add(`producto-carta-${tema}`);

            // Imagen
            const img = document.createElement("img");
            img.src = item.imagen;
            img.alt = item.marca + " " + item.modelo;

            // nombre
            const h3 = document.createElement("h3");
            h3.textContent = item.marca + " " + item.modelo;

            // precio
            const precio = document.createElement("p");
            precio.textContent = `Precio: $${item.precio}`;

            // cantidad con botones
            const cantidad = document.createElement("p");
            cantidad.textContent = "Cantidad: ";

            const btnMenos = document.createElement("button");
            btnMenos.textContent = "-";
            btnMenos.addEventListener("click", () => modificarCantidad(index, -1));

            const spanCantidad = document.createElement("span");
            spanCantidad.textContent = ` ${item.cantidad} `;

            const btnMas = document.createElement("button");
            btnMas.textContent = "+";
            btnMas.addEventListener("click", () => modificarCantidad(index, 1));

            cantidad.appendChild(btnMenos);
            cantidad.appendChild(spanCantidad);
            cantidad.appendChild(btnMas);

            // btn eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.style.width = "80%";
            btnEliminar.addEventListener("click", () => eliminarProducto(index));

            // agregar elementos al div
            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(precio);
            div.appendChild(cantidad);
            div.appendChild(btnEliminar);
            cont.appendChild(div);

            // detalle
            const prodDetalle = document.createElement("p");
            prodDetalle.textContent = `Producto: ${item.marca + " " + item.modelo}, cantidad: ${item.cantidad}`;
            prodDetalle.classList.add("detalle-productos-compra");
            tema === "claro" ? (prodDetalle.style.color = "black") : (prodDetalle.style.color = "white");
            $("detalleCompra").appendChild(prodDetalle);

            total += item.precio * item.cantidad;
        });
    }
    // total
    const totalCompra = $("totalCompra");
    totalCompra.textContent = `Total: $${total}`;
}

// aplicar tema
function cargarPagina(tema) {
    cambiarTemaMain(tema);
    cambiarTemaTitulo(tema);
    renderCarrito(tema);
    const temaSelect = $("temaSelect");
    if (temaSelect) {
        temaSelect.value = tema;
        temaSelect.addEventListener("change", () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            cargarPagina(nuevoTema);
        });
    }
    tema === "claro" ? ($("detalleTotal").style.backgroundColor = "#fff") : ($("detalleTotal").style.backgroundColor = "#222");
    tema === "claro" ? ($("totalCompra").style.color = "#222") : ($("totalCompra").style.color = "#fff");
}

// modificar cantidad
function modificarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    cargarPagina(getTema());
}

// eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    cargarPagina(getTema());
}

// ============================== LISTENERS ==============================

$("btnFinalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito esta vacio.");
        return;
    }

    const modal = $("modalCompraConfirm");
    const btnClose = $("cerrarModal");
    const btnConfirm = $("confirmCompra");
    const btnCancel = $("cancelCompra");

    modal.style.display = "block";

    btnClose.addEventListener("click", () => (modal.style.display = "none"));
    btnCancel.addEventListener("click", () => (modal.style.display = "none"));

    btnConfirm.onclick = async () => {
        let data = {
            cliente: localStorage.getItem("nombreCliente"),
            productos: carrito,
            fecha: new Date(),
            total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
        };

        try {
            const result = await crearVenta(data);
            localStorage.setItem("idVenta", JSON.stringify(result.data.venta.id));
            localStorage.removeItem("carrito");
            window.location.href = "/ticket.html";
        } catch (error) {
            alert(error);
        }
    };
});

// btn salir
$("btnSalir").addEventListener("click", () => {
    localStorage.removeItem("carrito");
});

document.addEventListener("DOMContentLoaded", async () => {
    // obtengo la url de la api
    const response = await obtenerApiUrl();
    API_URL = response.API_URL;

    // cargar carrito
    carrito = cargarCarrito();

    // obtener productos activos
    const activos = await obtenerProductosActivos();

    // limpiar carrito
    const carritoLimpio = limpiarCarrito(carrito, activos);

    // guardar si cambio
    if (carritoLimpio.length !== carrito.length) {
        carrito = carritoLimpio;
        guardarCarrito(carrito);
    }

    // cargar pagina
    const tema = getTema() || "claro";
    cargarPagina(tema);
});
