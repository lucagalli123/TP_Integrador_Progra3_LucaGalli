import { getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./temas.js";
import { obtenerConfig } from "./variablesEntorno.js";
import { $ } from "./utils.js";

// funcion para obtener el ticket de la api del back
async function obtenerTicket(id) {
    try {
        const response = await fetch(`${API_URL}/api/ventas/${id}`);
        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message);
        }

        return resultado;
    } catch (error) {
        throw error;
    }
}

// recibe el tema(claro/oscuro) y el ticket descargado de la api
function cargarPagina(tema, ticket) {
    const cont = $("ticketContainer");
    cont.innerHTML = "";

    if (!ticket) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay ticket disponible.";
        cont.appendChild(mensaje);
    } else {
        // formateo el ticket para obtener los datos para mostrar el ticket
        const ticketFormateado = {
            cliente: ticket.cliente,
            fecha: ticket.fecha,
            total: ticket.total,
            productos: ticket.VentaProductos.map(vp => ({
                marca: vp.Producto.marca,
                modelo: vp.Producto.modelo,
                cantidad: vp.cantidad,
                precio: vp.precioUnitario,
            })),
        };

        const div = document.createElement("div");
        div.classList.add("producto-card");
        div.style.backgroundColor = tema === "oscuro" ? "#d9d7d7ff" : "white";

        // nombre empresa
        const empresa = document.createElement("span");
        empresa.textContent = "Riffhouse";
        empresa.classList.add("fuente-nombre-empresa-ticket");
        div.appendChild(empresa);

        // cliente
        const nombre = document.createElement("p");
        nombre.textContent = `Cliente: ${ticketFormateado.cliente}`;
        div.appendChild(nombre);

        // fecha
        const fecha = document.createElement("p");
        const fechaOriginal = new Date(ticketFormateado.fecha);
        const fechaFormateada = fechaOriginal.toLocaleDateString();
        fecha.textContent = `Fecha: ${fechaFormateada}`;
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

        ticketFormateado.productos.forEach(p => {
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
        totalNumero.textContent = `$${ticketFormateado.total}`;
        totalNumero.style.fontWeight = "bold";
        totalNumero.style.marginTop = "15px";

        divTotal.appendChild(totalLiteral);
        divTotal.appendChild(totalNumero);
        divTotal.classList.add("div-total-ticket");

        div.appendChild(divTotal);

        cont.appendChild(div);
    }
}

// recibe: el tema (claro/oscuro) y el ticket descargado de la api
function aplicarTema(tema, ticket) {
    cambiarTemaMain(tema);
    cargarPagina(tema, ticket);
    cambiarTemaTitulo(tema);
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

// ================ LISTENERS =================

// aplica configuraciones cuando carga el DOM
let API_URL = "";
let idVenta = JSON.parse(localStorage.getItem("idVenta"));
document.addEventListener("DOMContentLoaded", async () => {
    const config = await obtenerConfig();
    API_URL = config.API_URL;
    const temaGuardado = getTema() || "claro";
    try {
        const ticketDescargado = await obtenerTicket(idVenta);
        aplicarTema(temaGuardado, ticketDescargado.resultado);
    } catch (error) {
        console.error(error); // <----- VER DESPUES QUE HACER CON ESTE ERROR
    }
});

// boton para descargar el pdf (peticion al back)
document.getElementById("btnDescargar").addEventListener("click", () => {
    window.open(`${API_URL}/api/ticket/${idVenta}/download`);
});

// boton nueva compra
$("btnNuevaCompra").addEventListener("click", () => {
    localStorage.removeItem("idVenta");
    window.location.href = "index.html";
});
