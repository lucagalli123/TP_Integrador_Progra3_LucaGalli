import { $ } from "./utils.js";
import { getTema, setTema, cambiarTemaTitulo, cambiarTemaMain } from "./temas.js";

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

// aplicar tema al cargar la pagina...
document.addEventListener("DOMContentLoaded", () => {
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
