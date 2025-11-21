import { $ } from "./utils.js";
import { getTema, setTema, cambiarTemaTitulo, cambiarTemaMain } from "./temas.js";
import { obtenerConfig } from "./variablesEntorno.js";

// aplicar cambio de tema general
function aplicarTema(tema) {
    cambiarTemaMain(tema);
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

// LISTENERS ===============================================================

// let API_URL = "";
// document.addEventListener("DOMContentLoaded", async () => {
//     const config = await obtenerConfig();
//     API_URL = config.API_URL;
//     const temaGuardado = getTema() || "claro";
//     try {
//         const ticketDescargado = await obtenerTicket(idVenta);
//         aplicarTema(temaGuardado, ticketDescargado.resultado);
//     } catch (error) {
//         console.error(error); // <----- VER DESPUES QUE HACER CON ESTE ERROR
//     }
// });

// aplicar tema al cargar la pagina...
let API_URL = "";
document.addEventListener("DOMContentLoaded", async () => {
    const config = await obtenerConfig();
    API_URL = config.API_URL;
    const temaGuardado = getTema() || "claro";
    aplicarTema(temaGuardado);
});

// boton continuar
$("btnContinuar").addEventListener("click", () => {
    const nombre = $("nombreCliente").value.trim();
    if (!nombre) {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    localStorage.setItem("nombreCliente", nombre);
    window.location.href = "./productos.html";
});

$("btnPantallaAdmin").addEventListener("click", () => {
    window.location.href = `${API_URL}/admin/login`;
});
