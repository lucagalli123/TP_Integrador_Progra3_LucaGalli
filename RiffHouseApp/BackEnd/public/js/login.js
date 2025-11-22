import { $, limpiarError, listenersInputsLimpiarErrores } from "./utils.js";
import { marcarError } from "./utils.js";

import { listenersInputsBlur } from "./utils.js";
import { listenersInputsFocus } from "./utils.js";

const form = document.getElementById("loginForm");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");

let inputEmail = $("inputEmail");
let errorEmail = $("errorEmail");

let inputPassword = $("inputPassword");
let errorPassword = $("errorPassword");

const listaInputsErrors = [
    { input: $("inputEmail"), errorText: $("errorEmail") },
    { input: $("inputPassword"), errorText: $("errorPassword") },
];

// funciones

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

function validarDatos(email, password) {
    let todoOk = true;

    if (!email) {
        todoOk = false;
        marcarError(inputEmail, errorEmail, "*Campo vacio");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            todoOk = false;
            marcarError(inputEmail, errorEmail, "*El email no tiene un formato valido");
        }
    }

    if (!password) {
        todoOk = false;
        marcarError(inputPassword, errorPassword, "*Campo vacio");
    }

    if (password.length < 1) {
        todoOk = false;
        marcarError(inputPassword, errorPassword, "*Campo vacio");
    }
    return todoOk;
}

// listeners

form.addEventListener("submit", async e => {
    e.preventDefault();
    const emailValue = $("inputEmail").value;
    const passwordValue = $("inputPassword").value;
    if (validarDatos(emailValue, passwordValue)) await loguearse(emailValue, passwordValue);
});

// listeners de los inputs y mensajes de error (blur, focus, input)
listenersInputsBlur(listaInputsErrors);
listenersInputsFocus(listaInputsErrors);
listenersInputsLimpiarErrores(listaInputsErrors);

// listener del boton de acceso rapido
btnAccesoRapido.addEventListener("click", async () => {
    limpiarError(inputEmail, errorEmail);
    limpiarError(inputPassword, errorPassword);
    $("inputEmail").value = "moni@example.com";
    $("inputPassword").value = "1234";
});
