export function $(id) {
    return document.getElementById(id);
}

// marca error en input y en mensaje de error
export function marcarError(input, errorText, errorMensaje) {
    input.className = "";
    input.classList.add("input-error");
    errorText.textContent = errorMensaje;
    errorText.classList.replace("oculto", "visible");
}

// limpia error en input y en mensaje de errror
export function limpiarError(input, errorText) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-focus");
    errorText.classList.replace("visible", "oculto");
}

// diseño del focus en input
function inputFocus(input) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-focus");
}

// diseño del blur en input
function inputBlur(input) {
    input.className = "";
    input.classList.add("input-normal");
    input.classList.add("input-blur");
}

// agrega listeners para focus de inputs (recibe una lista de inputs: obj --> (con input y el mensaje de error))
export function listenersInputsFocus(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("focus", () => {
            if (!e.input.classList.contains("input-error")) inputFocus(e.input);
        });
    });
}

// agrega listeners para blur de inputs (recibe una lista de inputs: obj --> (con input y el mensaje de error))
export function listenersInputsBlur(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("blur", () => {
            if (!e.input.classList.contains("input-error")) inputBlur(e.input);
        });
    });
}
// agrega listeners para limpiar errores de inputs cuando escribis en el input (recibe una lista de inputs (con input y los mensaje de error))
export function listenersInputsLimpiarErrores(listaInputs) {
    listaInputs.forEach(e => {
        e.input.addEventListener("input", () => {
            limpiarError(e.input, e.errorText);
        });
    });
}

export function getTema() {
    const temaGuardado = localStorage.getItem("tema") || "claro";
    return temaGuardado;
}

export function cambiarTemaMain(nombreMain, tema) {
    const main = $(nombreMain);
    if (!main) return;
    main.classList.toggle("oscuro", tema === "oscuro");
    main.classList.toggle("claro", tema === "claro");
}

export function cambiarTemaTitulo(nombreTitulo, tema) {
    const titulo = $(nombreTitulo);
    if (!titulo) return;
    titulo.style.color = tema === "oscuro" ? "white" : "black";
}

export function cambiarTemaHeader(nombreHeader, tema) {
    const header = $(nombreHeader);
    if (!header) return;
    header.classList.toggle("header-oscuro", tema === "oscuro");
    header.classList.toggle("header-claro", tema === "claro");
}

export function cambiarTemaFooter(nombreFooter, tema) {
    const footer = $(nombreFooter);
    if (!footer) return;
    footer.classList.toggle("footer-oscuro", tema === "oscuro");
    footer.classList.toggle("footer-claro", tema === "claro");
}

// export function cambiarTemaForm(main, tema) {
//     const footer = $(main);
//     if (!footer) return;
//     footer.classList.toggle("footer-oscuro", tema === "oscuro");
//     footer.classList.toggle("footer-claro", tema === "claro");
// }
