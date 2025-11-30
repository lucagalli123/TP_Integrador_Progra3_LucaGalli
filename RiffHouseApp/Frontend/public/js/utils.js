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
