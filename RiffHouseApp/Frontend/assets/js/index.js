import { $ } from "./utils.js";
import { obtenerTemaCargadoLocalStorage, cargarTemaLocalStorage } from "./temas.js";

// Botón continuar
$("btnContinuar").addEventListener("click", () => {
    const nombre = $("nombreUsuario").value.trim();
    if (!nombre) {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    localStorage.setItem("nombreUsuario", nombre);
    window.location.href = "productos.html";
});

// Funciones de tema
function cargarTemaMain(tema) {
    const main = $("main");
    if (!main) return;
    main.classList.toggle("oscuro", tema === "oscuro");
    main.classList.toggle("claro", tema === "claro");
}

function cambiarColorTitulo(tema) {
    const titulo = $("titulo");
    if (!titulo) return;
    titulo.style.color = tema === "oscuro" ? "white" : "black";
}

function aplicarTema(tema) {
    cargarTemaMain(tema);
    cambiarColorTitulo(tema);

    const temaSelect = $("tema");
    if (temaSelect) {
        temaSelect.value = tema;
        temaSelect.addEventListener("change", () => {
            const nuevoTema = temaSelect.value;
            cargarTemaLocalStorage(nuevoTema);
            aplicarTema(nuevoTema);
        });
    }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = obtenerTemaCargadoLocalStorage();
    aplicarTema(temaGuardado);
});
