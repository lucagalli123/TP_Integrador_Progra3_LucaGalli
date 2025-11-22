export function $(id) {
    return document.getElementById(id);
}

export function marcarError(input, errorText, errorMensaje) {
    input.className = "";
    input.classList.add("input-error");
    errorText.textContent = errorMensaje;
    errorText.classList.replace("oculto", "visible");
}

export function limpiarError(input, errorText) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-focus");
    errorText.classList.replace("visible", "oculto");
}

function inputFocus(input) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-focus");
}

function inputBlur(input) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-blur");
}

export function listenersInputsFocus(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("focus", () => {
            if (!e.input.classList.contains("input-error")) inputFocus(e.input);
        });
    });
}

export function listenersInputsBlur(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("blur", () => {
            if (!e.input.classList.contains("input-error")) inputBlur(e.input);
        });
    });
}

export function listenersInputsLimpiarErrores(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("input", () => {
            limpiarError(e.input, e.errorText);
        });
    });
}
