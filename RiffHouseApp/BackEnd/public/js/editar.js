// import { $ } from "./utils.js";
import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";

const form = document.getElementById("editarForm");
const btnEditar = document.getElementById("btnEditar");
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

// FUNCIONES ___

function validarDatos(marca, modelo, categoria, precio, imagen) {
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

    if (!imagen) {
        todoOk = false;
        marcarError(inputImagen, errorImagen, "*campo vacio");
    }
    return todoOk;
}

// listeners__________

// enviar form
form.addEventListener("submit", async e => {
    e.preventDefault();
    try {
        const marca = inputMarca.value;
        const modelo = inputModelo.value;
        const categoria = inputCategoria.value;
        const precio = inputPrecio.value;
        const imagen = inputImagen.value;

        // despues ver tema de apiurl en .env
        // marca, modelo, categoria, precio, imagen
        if (validarDatos(marca, modelo, categoria, precio, imagen)) {
            const response = await fetch(`http://localhost:3001/api/productos/${PRODUCT_ID}`, {
                method: "PATCH",
                body: JSON.stringify({ marca, modelo, categoria, precio, imagen }),
                headers: { "Content-Type": "application/json" },
            });
            const resultado = await response.json();
            console.log(resultado);
        }
    } catch (error) {
        console.error(error);
    }
});

// console.log(PRODUCT_ID);
