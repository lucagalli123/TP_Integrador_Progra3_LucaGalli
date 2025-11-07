import { getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./temas.js";
import { $ } from "./utils.js";

// obtener ticket
const ticket = JSON.parse(localStorage.getItem("ticket"));
// console.log(ticket);

function cargarPagina(tema) {
    const cont = $("ticketContainer");
    cont.innerHTML = "";

    if (!ticket) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay ticket disponible.";
        cont.appendChild(mensaje);
    } else {
        const div = document.createElement("div");
        // div.setAttribute("id", "divTicket");
        div.classList.add("producto-card");
        div.style.backgroundColor = tema === "oscuro" ? "#d9d7d7ff" : "white";

        const empresa = document.createElement("span");
        empresa.textContent = "Riffhouse";
        empresa.classList.add("fuente-nombre-empresa-ticket");
        div.appendChild(empresa);

        const nombre = document.createElement("p");
        nombre.textContent = `Cliente: ${ticket.cliente}`;
        div.appendChild(nombre);

        const fecha = document.createElement("p");
        fecha.textContent = `Fecha: ${ticket.fecha}`;
        div.appendChild(fecha);

        // tabla
        const tabla = document.createElement("table");
        // tabla.setAttribute("id", "tablaTicket");
        // tabla.style.backgroundColor = tema === "oscuro" ? "black" : "white";
        // tabla.style.color = tema === "oscuro" ? "white" : "black";
        tabla.classList.add("tabla-productos");

        //  encabezado
        const thead = document.createElement("thead");

        const encabezadoFila = document.createElement("tr");
        const columnas = ["Artículo", "Cantidad", "Precio Unitario", "Total"];
        columnas.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col;
            // th.style.backgroundColor = tema === "oscuro" ? "black" : "white";
            // th.style.color = tema === "oscuro" ? "white" : "black";
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
            precio.textContent = `$${p.precio}`;
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
}

function aplicarTema(tema) {
    cambiarTemaMain(tema);
    cargarPagina(tema);
    cambiarTemaTitulo(tema);
    // tema === "oscuro" ? ($("divTicket").style.backgroundColor = "black") : ($("divTicket").style.backgroundColor = "white");
    // tema === "oscuro" ? ($("divTicket").style.color = "white") : ($("divTicket").style.color = "black");
    // tema === "oscuro" ? ($("divTabla").style.color = "white") : ($("divTabla").style.color = "black");
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

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = getTema() || "claro";
    aplicarTema(temaGuardado);
});

// ================ LISTENERS =================

// boton nueva compra
$("btnNuevaCompra").addEventListener("click", () => {
    localStorage.removeItem("ticket");
    window.location.href = "index.html";
});

// cargarPagina();
