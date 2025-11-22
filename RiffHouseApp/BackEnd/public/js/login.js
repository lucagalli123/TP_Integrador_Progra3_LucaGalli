import { $ } from "./utils.js";

const form = document.getElementById("loginForm");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");

async function loguearse(email, password) {
    try {
        const response = await fetch("/api/usuarios/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const resultado = await response.json();

        if (response.ok) {
            window.location.href = "/admin/dashboard";
        } else {
            // VER DESPUES COMO MOSTRAR EL ERROR ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            alert(resultado.message);
            console.error("error");
        }
    } catch (error) {
        console.error("Error en login:", error);
        // VER DESPUES TEMA ERROR DE LA PETICION AL ENVIARLA ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    }
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const emailValue = $("inputEmail").value;
    const passwordValue = $("inputPassword").value;
    await loguearse(emailValue, passwordValue);
});

btnAccesoRapido.addEventListener("click", async () => {
    $("inputEmail").value = "moni@example.com";
    $("inputPassword").value = "1234";
});
