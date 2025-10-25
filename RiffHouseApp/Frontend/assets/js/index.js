import { $ } from "./utils.js";

const btn = $("btnContinuar");
btn.addEventListener("click", () => {
    const nombre = $("nombreUsuario").value.trim();
    if (nombre === "") {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    localStorage.setItem("nombreUsuario", nombre);
    window.location.href = "productos.html";
});
