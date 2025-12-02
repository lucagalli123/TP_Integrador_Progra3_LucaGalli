export function $(id) {
    return document.getElementById(id);
}

export function marcarError(input, clase) {
    input.className = "";
    input.classList.add(clase);
}

export function limpiarError(input, clase) {
    input.className = "";
    input.classList.add(clase);
}

export function getTema() {
    const temaGuardado = localStorage.getItem("tema") || "claro";
    return temaGuardado;
}

export function setTema(tema) {
    localStorage.setItem("tema", tema);
}

export function cambiarTemaMain(tema) {
    const main = $("main");
    if (!main) return;
    main.classList.toggle("oscuro", tema === "oscuro");
    main.classList.toggle("claro", tema === "claro");
}

export function cambiarTemaTitulo(tema) {
    const titulo = $("titulo");
    if (!titulo) return;
    titulo.style.color = tema === "oscuro" ? "white" : "black";
}

export function cambiarTemaHeader(tema) {
    const header = $("header");
    if (!header) return;
    header.classList.toggle("header-oscuro", tema === "oscuro");
    header.classList.toggle("header-claro", tema === "claro");
}

export function cambiarTemaFooter(tema) {
    const footer = $("footer");
    if (!footer) return;
    footer.classList.toggle("footer-oscuro", tema === "oscuro");
    footer.classList.toggle("footer-claro", tema === "claro");
}
