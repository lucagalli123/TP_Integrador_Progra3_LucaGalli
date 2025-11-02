// import { createElement } from "react";
import { getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./temas.js";
import { $ } from "./utils.js";

// obtener ticket
const ticket = JSON.parse(localStorage.getItem("ticket"));

const cont = $("ticketContainer");

if (!ticket) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay ticket disponible.";
    cont.appendChild(mensaje);
} else {
    const div = document.createElement("div");
    div.classList.add("producto-card");

    const empresa = document.createElement("span");
    empresa.textContent = "Riffhouse";
    empresa.classList.add("fuente-nombre-empresa-ticket");
    div.appendChild(empresa);

    const nombre = document.createElement("p");
    nombre.textContent = `Cliente: ${ticket.nombreUsuario}`;
    div.appendChild(nombre);

    const fecha = document.createElement("p");
    fecha.textContent = `Fecha: ${ticket.fecha}`;
    div.appendChild(fecha);

    // tabla
    const tabla = document.createElement("table");
    tabla.classList.add("tabla-productos");

    //  encabezado
    const thead = document.createElement("thead");
    const encabezadoFila = document.createElement("tr");
    const columnas = ["Artículo", "Cantidad", "Precio Unitario", "Total"];
    columnas.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        encabezadoFila.appendChild(th);
    });
    thead.appendChild(encabezadoFila);
    tabla.appendChild(thead);

    //  cuerpo de la tabla
    const tbody = document.createElement("tbody");

    ticket.productos.forEach(p => {
        const fila = document.createElement("tr");

        const articulo = document.createElement("td");
        articulo.textContent = `${p.marca} ${p.modelo}`;
        fila.appendChild(articulo);

        const cantidad = document.createElement("td");
        cantidad.textContent = p.cantidad;
        fila.appendChild(cantidad);

        const precio = document.createElement("td");
        precio.textContent = `$${p.precio.toFixed(2)}`;
        fila.appendChild(precio);

        const subtotal = document.createElement("td");
        subtotal.textContent = `$${(p.precio * p.cantidad).toFixed(2)}`;
        fila.appendChild(subtotal);

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    div.appendChild(tabla);

    const divLinea = document.createElement("div");
    divLinea.classList.add("div-linea");
    div.appendChild(divLinea);

    // total general
    const divTotal = document.createElement("div");

    const totalLiteral = document.createElement("span");
    totalLiteral.textContent = "Total:";
    totalLiteral.style.marginTop = "15px";

    const totalNumero = document.createElement("span");

    // VER TEMA DE CANTIDAD DE DECIMALES
    totalNumero.textContent = `$${ticket.total}`;
    totalNumero.style.fontWeight = "bold";
    totalNumero.style.marginTop = "15px";

    divTotal.appendChild(totalLiteral);
    divTotal.appendChild(totalNumero);
    divTotal.classList.add("div-total-ticket");

    div.appendChild(divTotal);

    cont.appendChild(div);
}

// boton nueva compra
$("btnNuevaCompra").addEventListener("click", () => {
    localStorage.removeItem("ticket");
    window.location.href = "index.html";
});
