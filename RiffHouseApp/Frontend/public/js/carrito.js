import { getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./temas.js";
import { obtenerApiUrl } from "./variablesEntorno.js";
import { $ } from "./utils.js";

// leer carrito desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// peticion al back para crear venta
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

// carga el carrito
function renderCarrito(tema) {
    const cont = $("carritoContainer");
    cont.innerHTML = "";
    let total = 0;
    $("detalleCompra").innerHTML = "";

    if (carrito.length === 0) {
        const contVacio = $("carritoContainerVacio");
        const p = document.createElement("p");
        p.textContent = "El carrito esta vacio.";
        tema === "claro" ? (p.style.color = "black") : (p.style.color = "white");
        contVacio.appendChild(p);
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add(`producto-carta-${tema}`);

            // imagen
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

            // boton eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.style.width = "80%";
            btnEliminar.addEventListener("click", () => eliminarProducto(index));

            // agregar todo al div
            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(precio);
            div.appendChild(cantidad);
            div.appendChild(btnEliminar);

            // agregar div al contenedor
            cont.appendChild(div);

            const prodDetalle = document.createElement("p");
            prodDetalle.textContent = `Producto: ${item.marca + " " + item.modelo}, cantidad: ${item.cantidad}`;
            prodDetalle.classList.add("detalle-productos-compra");
            tema === "claro" ? (prodDetalle.style.color = "black") : (prodDetalle.style.color = "white");
            $("detalleCompra").appendChild(prodDetalle);

            total += item.precio * item.cantidad;
        });
    }

    // mostrar total
    const totalCompra = $("totalCompra");
    totalCompra.textContent = `Total: $${total}`;
}

function aplicarTema(tema) {
    cambiarTemaMain(tema);
    renderCarrito(tema);
    cambiarTemaTitulo(tema);
    tema === "claro" ? ($("detalleTotal").style.backgroundColor = "#ffffffff") : ($("detalleTotal").style.backgroundColor = "#222");
    tema === "claro" ? ($("totalCompra").style.color = "#222") : ($("totalCompra").style.color = "#ffffffff");
    const temaSelect = $("tema");
    if (temaSelect) {
        temaSelect.value = tema;
        temaSelect.addEventListener("change", () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            aplicarTema(nuevoTema);
        });
    }
}

// modificar cantidad de productos del carrito y recarga pagina
function modificarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    aplicarTema(getTema());
}

// elimina un producto del carrito y recarga pagina
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    aplicarTema(getTema());
}

// LISTENERS ======================================================

$("btnFinalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito esta vacio.");
        return;
    }

    const modal = $("modalCompraConfirm");
    // console.log(modal);
    const btnClose = $("cerrarModal");
    const btnConfirm = $("confirmCompra");
    const btnCancel = $("cancelCompra");

    // mostrar modal
    modal.style.display = "block";

    // cerrar con X
    btnClose.addEventListener("click", () => (modal.style.display = "none"));

    // cancelar compra
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

// boton salir (link <a>)
$("btnSalir").addEventListener("click", () => {
    localStorage.removeItem("carrito");
});

let API_URL = "";
document.addEventListener("DOMContentLoaded", async () => {
    // obtengo la url de la api
    const response = await obtenerApiUrl();
    API_URL = response.API_URL;

    const temaGuardado = getTema() || "claro";
    aplicarTema(temaGuardado);
});
