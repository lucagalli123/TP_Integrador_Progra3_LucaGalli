import { $ } from "./utils.js";
// import { obtenerTemaCargado } from "./temas.js";

// leer carrito desde el loscalStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// leer tema desde el localStorage
// document.addEventListener("DOMContentLoaded", () => {
//     const temaCargado = obtenerTemaCargado();
// });

function renderCarrito() {
    const cont = $("carritoContainer");
    cont.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        const p = document.createElement("p");
        p.textContent = "El carrito está vacío.";
        p.style.position = "absolute";
        p.style.top = "50%";
        p.style.left = "50%";
        p.style.transform = "translate(-50%, -50%)";
        cont.appendChild(p);
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("producto-carta-claro");

            // imagen
            const img = document.createElement("img");
            img.src = item.imagen;
            img.alt = item.nombre;

            // nombre
            const h3 = document.createElement("h3");
            h3.textContent = item.nombre;

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

            total += item.precio * item.cantidad;
        });
    }

    // mostrar total
    const totalCompra = $("totalCompra");
    totalCompra.textContent = `Total: $${total}`;
}

function modificarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// boton finalizar
$("btnFinalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    if (confirm("¿Desea confirmar la compra?")) {
        // guardar carrito en localStorage para ticket
        localStorage.setItem(
            "ticket",
            JSON.stringify({
                nombreUsuario: localStorage.getItem("nombreUsuario"),
                productos: carrito,
                fecha: new Date().toLocaleString(),
                total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
            })
        );
        // Limpiar carrito
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "ticket.html";
    }
});

// boton salir
$("btnSalir").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
});

renderCarrito();
