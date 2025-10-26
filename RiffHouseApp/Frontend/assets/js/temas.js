import { $ } from "./utils.js";

export function obtenerTemaCargadoLocalStorage() {
    const temaGuardado = localStorage.getItem("tema") || "claro";
    return temaGuardado;
}

export function cargarTemaLocalStorage(tema) {
    localStorage.setItem("tema", tema);
}

export function cargarTemaMain(tema) {
    const main = $("main");
    if (!main) return;
    main.classList.toggle("oscuro", tema === "oscuro");
    main.classList.toggle("claro", tema === "claro");
}
