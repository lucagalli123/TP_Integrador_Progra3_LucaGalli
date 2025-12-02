import { $, getTema, setTema, cambiarTemaHeader, cambiarTemaMain, cambiarTemaTitulo, marcarError, limpiarError, cambiarTemaFooter } from "./utils.js";
import { obtenerApiUrl } from "./variablesEntorno.js";

// =============================== FUNCIONES ===============================

// aplicar cambio de tema general
function cargarPagina(tema) {
    cambiarTemaHeader(tema);
    cambiarTemaMain(tema);
    cambiarTemaTitulo(tema);
    cambiarTemaFooter(tema);
    const temaSelect = $("temaSelect");
    if (temaSelect) {
        temaSelect.value = tema;
        temaSelect.addEventListener("change", () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            cargarPagina(nuevoTema);
        });
    }
}

// =============================== LISTENERS ===============================

// aplicar tema al cargar la pagina...
let API_URL = "";
document.addEventListener("DOMContentLoaded", async () => {
    // obtengo la url de la api
    const response = await obtenerApiUrl();
    API_URL = response.API_URL;

    const temaGuardado = getTema() || "claro";
    cargarPagina(temaGuardado);
});

// boton continuar
$("formIngreso").addEventListener("submit", e => {
    e.preventDefault();
    const nombre = $("nombreCliente").value.trim();
    if (!nombre) {
        marcarError($("nombreCliente"), "inputNombreClienteError");
        setTimeout(() => {
            limpiarError($("nombreCliente"), "inputNombreClienteNormal");
        }, 1000);
        return;
    }
    localStorage.setItem("nombreCliente", nombre);
    window.location.href = "./productos.html";
});

$("btnPantallaAdmin").addEventListener("click", () => {
    window.location.href = `${API_URL}/admin/login`;
});
