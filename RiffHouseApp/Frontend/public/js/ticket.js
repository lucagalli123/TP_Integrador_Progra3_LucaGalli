import { $ } from "./utils.js";

// obtener ticket
const ticket = JSON.parse(localStorage.getItem("ticket"));

const cont = $("ticketContainer");

if (!ticket) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay ticket disponible.";
    cont.appendChild(mensaje);
} else {
    const nombre = document.createElement("p");
    nombre.textContent = `Cliente: ${ticket.nombreUsuario}`;
    cont.appendChild(nombre);

    const fecha = document.createElement("p");
    fecha.textContent = `Fecha: ${ticket.fecha}`;
    cont.appendChild(fecha);

    ticket.productos.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("producto-card");

        const titulo = document.createElement("span");
        titulo.textContent = `${p.marca} ${p.modelo}`;
        titulo.classList.add("nombre-producto");
        div.appendChild(titulo);

        const cantidad = document.createElement("p");
        cantidad.textContent = `Cantidad: ${p.cantidad}`;
        div.appendChild(cantidad);

        const precio = document.createElement("p");
        precio.textContent = `Precio unitario: $${p.precio}`;
        div.appendChild(precio);

        const subtotal = document.createElement("p");
        subtotal.textContent = `Subtotal: $${p.precio * p.cantidad}`;
        div.appendChild(subtotal);

        cont.appendChild(div);
    });

    const total = document.createElement("p");
    total.style.fontWeight = "bold";
    total.textContent = `Total a pagar: $${ticket.total}`;
    cont.appendChild(total);
}

// boton nueva compra
$("btnNuevaCompra").addEventListener("click", () => {
    localStorage.removeItem("ticket");
    window.location.href = "index.html";
});
