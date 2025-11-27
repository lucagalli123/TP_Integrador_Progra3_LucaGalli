import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";

const form = document.getElementById("altaForm");
const btnCancelar = document.getElementById("btnCancelar");

let inputMarca = $("inputMarca");
let errorMarca = $("errorMarca");

let inputModelo = $("inputModelo");
let errorModelo = $("errorModelo");

let inputCategoria = $("inputCategoria");
let errorCategoria = $("errorCategoria");

let inputPrecio = $("inputPrecio");
let errorPrecio = $("errorPrecio");

let inputImagen = $("inputImagen");
let errorImagen = $("errorImagen");

const listaInputsErrors = [
    { input: inputMarca, errorText: errorMarca },
    { input: inputModelo, errorText: errorModelo },
    { input: inputCategoria, errorText: errorCategoria },
    { input: inputPrecio, errorText: errorPrecio },
    { input: inputImagen, errorText: errorImagen },
];

function validarDatos(marca, modelo, categoria, precio, imagenFile) {
    let todoOk = true;

    if (!marca) {
        todoOk = false;
        marcarError(inputMarca, errorMarca, "*campo vacio");
    }
    if (!modelo) {
        todoOk = false;
        marcarError(inputModelo, errorModelo, "*campo vacio");
    }
    if (!categoria) {
        todoOk = false;
        marcarError(inputCategoria, errorCategoria, "*campo vacio");
    }
    if (!precio) {
        todoOk = false;
        marcarError(inputPrecio, errorPrecio, "*campo vacio");
    }
    if (!imagenFile) {
        todoOk = false;
        marcarError(inputImagen, errorImagen, "*suba una imagen");
    }

    return todoOk;
}

form.addEventListener("submit", async e => {
    e.preventDefault();

    const marca = inputMarca.value;
    const modelo = inputModelo.value;
    const categoria = inputCategoria.value;
    const precio = inputPrecio.value;
    const imagenFile = inputImagen.files[0];

    // validaciones del front
    if (!validarDatos(marca, modelo, categoria, precio, imagenFile)) return;

    const formData = new FormData();
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("categoria", categoria);
    formData.append("precio", precio);
    formData.append("imagen", imagenFile);

    try {
        const response = await fetch("/admin/productos/", {
            method: "POST",
            body: formData,
        });

        const resultado = await response.json();
        console.log(resultado);
        window.location.href = "/admin/dashboard";
    } catch (error) {
        console.error(error);
    }
});

btnCancelar.addEventListener("click", () => {
    window.location.href = "/admin/dashboard";
});

// LISTENERS ==============

// listeners de los inputs y mensajes de error (blur, focus, input)
listenersInputsBlur(listaInputsErrors);
listenersInputsFocus(listaInputsErrors);
listenersInputsLimpiarErrores(listaInputsErrors);
