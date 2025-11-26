import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";

const form = document.getElementById("editarForm");
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
    { input: $("inputMarca"), errorText: $("errorMarca") },
    { input: $("inputModelo"), errorText: $("errorModelo") },
    { input: $("inputCategoria"), errorText: $("errorCategoria") },
    { input: $("inputModelo"), errorText: $("errorModelo") },
    { input: $("inputModelo"), errorText: $("errorModelo") },
];

// function validarDatos(marca, modelo, categoria, precio, imagenFile) {
//     let todoOk = true;

//     if (!marca) {
//         todoOk = false;
//         marcarError(inputMarca, errorMarca, "*campo vacío");
//     }
//     if (!modelo) {
//         todoOk = false;
//         marcarError(inputModelo, errorModelo, "*campo vacío");
//     }
//     if (!categoria) {
//         todoOk = false;
//         marcarError(inputCategoria, errorCategoria, "*campo vacío");
//     }
//     if (!precio) {
//         todoOk = false;
//         marcarError(inputPrecio, errorPrecio, "*campo vacío");
//     }
//     if (!imagenFile) {
//         todoOk = false;
//         marcarError(inputImagen, errorImagen, "*suba una imagen");
//     }

//     return todoOk;
// }

form.addEventListener("submit", async e => {
    e.preventDefault();

    const marca = inputMarca.value;
    const modelo = inputModelo.value;
    const categoria = inputCategoria.value;
    const precio = inputPrecio.value;
    const imagenFile = inputImagen.files[0]; // <— IMPORTANTE

    // despues pasar a middleware...
    // if (!validarDatos(marca, modelo, categoria, precio, imagenFile)) return;

    const formData = new FormData();
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("categoria", categoria);
    formData.append("precio", precio);
    formData.append("imagen", imagenFile);

    try {
        const response = await fetch(`/admin/productos/${PRODUCT_ID}`, {
            method: "PATCH",
            body: formData,
        });

        const resultado = await response.json();
        window.location.href = "/admin/dashboard?tipo=admin";
    } catch (error) {
        console.error(error);
    }
});

btnCancelar.addEventListener("click", () => {
    window.location.href = "/admin/dashboard?tipo=admin";
});

// LISTENERS ==============

// listeners de los inputs y mensajes de error (blur, focus, input)
// listenersInputsBlur(listaInputsErrors);
// listenersInputsFocus(listaInputsErrors);
// listenersInputsLimpiarErrores(listaInputsErrors);
