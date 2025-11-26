import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";
// import { marcarError } from "./utils.js";

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
        const response = await fetch("/admin/usuarios/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "/admin/dashboard";
        } else {
            if (data.error === "email invalido") {
                marcarError(inputEmail, errorEmail, `*${data.error}`);
            } else if (data.error === "contraseña invalida") {
                marcarError(inputPassword, errorPassword, `*${data.error}`);
            }
        }
    } catch (error) {
        alert("Error en login:\n", error);
    }
}

function validarDatos(email, password) {
    let todoOk = true;

    if (!email) {
        todoOk = false;
        marcarError(inputEmail, errorEmail, "*campo vacio");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            todoOk = false;
            marcarError(inputEmail, errorEmail, "*el email no tiene un formato valido");
        }
    }

    if (!password) {
        todoOk = false;
        marcarError(inputPassword, errorPassword, "*campo vacio");
    }

    if (password.length < 1) {
        todoOk = false;
        marcarError(inputPassword, errorPassword, "*campo vacio");
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
