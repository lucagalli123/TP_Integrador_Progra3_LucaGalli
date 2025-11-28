import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";

// ============== DOM elementos ==============

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

// ============== FUNCIONES ==============

async function loguearse(email, password) {
    try {
        const response = await fetch("/admin/usuarios/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
            if (result.message === "email invalido") {
                marcarError(inputEmail, errorEmail, `*${result.message}`);
            } else if (result.message === "contraseña invalida") {
                marcarError(inputPassword, errorPassword, `*${result.message}`);
            } else {
                alert(`ERROR ${response.status}\n${result.message}`);
            }
            return;
        }

        window.location.href = "/admin/dashboard";
    } catch (error) {
        alert(`Ocurrio un error\n${error.name}`);
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

// ============== LISTENERS ==============

// listener form
form.addEventListener("submit", e => {
    e.preventDefault();
    const emailValue = $("inputEmail").value;
    const passwordValue = $("inputPassword").value;
    if (validarDatos(emailValue, passwordValue)) loguearse(emailValue, passwordValue);
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
    $("inputPassword").value = "12345678";
});

// listener boton ingresar como cliente
$("btnIngresarComoCliente").addEventListener("click", () => {
    window.location.href = `http://localhost:3000/`;
});
