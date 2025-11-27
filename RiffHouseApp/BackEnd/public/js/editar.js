import { $, limpiarError, listenersInputsLimpiarErrores, listenersInputsBlur, listenersInputsFocus, marcarError } from "./utils.js";

// FUNCIONES

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
    const precioNum = Number(precio);
    if (!precio || isNaN(precioNum)) {
        todoOk = false;
        marcarError(inputPrecio, errorPrecio, "*precio invalido");
    } else if (precioNum < 0) {
        todoOk = false;
        marcarError(inputPrecio, errorPrecio, "*el precio no puede ser negativo");
    } else if (precioNum > 999999) {
        todoOk = false;
        marcarError(inputPrecio, errorPrecio, "*el precio no puede exceder las 6 cifras");
    }

    if (!imagenFile) {
        todoOk = false;
        marcarError(inputImagen, errorImagen, "*suba una imagen");
    }

    return todoOk;
}

// script

// ejecutar solo si se pudo obtener el producto y su id
if (PRODUCT_ID !== null && PRODUCT_ID !== undefined) {
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
        { input: inputMarca, errorText: errorMarca },
        { input: inputModelo, errorText: errorModelo },
        { input: inputCategoria, errorText: errorCategoria },
        { input: inputPrecio, errorText: errorPrecio },
        { input: inputImagen, errorText: errorImagen },
    ];

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const marca = inputMarca.value;
        const modelo = inputModelo.value;
        const categoria = inputCategoria.value;
        const precio = inputPrecio.value;
        const imagenFile = inputImagen.files[0];

        if (!validarDatos(marca, modelo, categoria, precio, imagenFile)) return;

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

            const result = await response.json();

            if (!response.ok) {
                alert(`ERROR ${response.status}, ${result.message}`);
            } else {
                window.location.href = "/admin/dashboard";
            }
        } catch (error) {
            alert(error);
            console.error(error);
        }
    });

    btnCancelar.addEventListener("click", () => {
        window.location.href = "/admin/dashboard";
    });

    // ============== LISTENERS ==============

    // listeners de los inputs y mensajes de error (blur, focus, input)
    listenersInputsBlur(listaInputsErrors);
    listenersInputsFocus(listaInputsErrors);
    listenersInputsLimpiarErrores(listaInputsErrors);
}
