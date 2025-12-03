import { authFetch } from "./autFetch.js";
import {
    $,
    limpiarError,
    listenersInputsLimpiarErrores,
    listenersInputsBlur,
    listenersInputsFocus,
    marcarError,
    getTema,
    cambiarTemaFooter,
    cambiarTemaTitulo,
    cambiarTemaHeader,
    cambiarTemaMain,
} from "./utils.js";

// ==================== TEMA ====================

const tema = getTema() || "claro";

document.documentElement.setAttribute("data-tema", tema);

const temaSelect = $("temaSelect");
temaSelect.value = tema;

cambiarTemaHeader("header", tema);
cambiarTemaTitulo("titulo", tema);
cambiarTemaMain("editarMain", tema);
cambiarTemaFooter("footer", tema);

const usuarioHeader = $("usuarioHeader");
const usuarioMenu = $("usuarioMenu");

if (tema === "claro") {
    usuarioMenu.classList.add("cerrar-sesion-claro");
    usuarioMenu.classList.remove("cerrar-sesion-oscuro");
} else {
    usuarioMenu.classList.add("cerrar-sesion-oscuro");
    usuarioMenu.classList.remove("cerrar-sesion-claro");
}

// ==================== VALIDACIONES ====================

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

// ==================== FORMULARIO ====================

if (PRODUCT_ID !== null && PRODUCT_ID !== undefined) {
    const form = $("form");
    const btnCancelar = $("btnCancelar");

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
            const response = await authFetch(`/admin/productos/${PRODUCT_ID}`, {
                method: "PATCH",
                body: formData,
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                alert(`ERROR ${response.status}\n${result.message}`);
            } else {
                const modal = $("modalProductoActualizado");
                const modalTitulo = $("modalTitulo");
                const btnClose = $("cerrarModal");
                const btnConfirm = $("btnSiConfirmar");

                modal.style.display = "block";
                modalTitulo.textContent = "¡Producto actualizado con exito!";

                btnClose.onclick = () => (window.location.href = "/admin/dashboard");
                btnConfirm.onclick = () => (window.location.href = "/admin/dashboard");
            }
        } catch (error) {
            alert(`Ocurrio un error\n${error.name}`);
            console.error(error);
        }
    });

    // cancelar
    btnCancelar.onclick = () => {
        window.location.href = "/admin/dashboard";
    };

    // listeners inputs
    listenersInputsBlur(listaInputsErrors);
    listenersInputsFocus(listaInputsErrors);
    listenersInputsLimpiarErrores(listaInputsErrors);
}

// ================ LISTENERs ======================

temaSelect.addEventListener("change", () => {
    const temaNuevo = temaSelect.value;

    localStorage.setItem("tema", temaNuevo);
    document.documentElement.setAttribute("data-tema", temaNuevo);

    cambiarTemaHeader("header", temaNuevo);
    cambiarTemaTitulo("titulo", temaNuevo);
    cambiarTemaMain("editarMain", temaNuevo);
    cambiarTemaFooter("footer", temaNuevo);

    // const usuarioHeader = $("usuarioHeader");
    // const usuarioMenu = $("usuarioMenu");

    if (temaNuevo === "claro") {
        usuarioMenu.classList.add("cerrar-sesion-claro");
        usuarioMenu.classList.remove("cerrar-sesion-oscuro");
    } else {
        usuarioMenu.classList.add("cerrar-sesion-oscuro");
        usuarioMenu.classList.remove("cerrar-sesion-claro");
    }
});

usuarioHeader.addEventListener("click", () => {
    usuarioMenu.classList.toggle("oculto");
});
