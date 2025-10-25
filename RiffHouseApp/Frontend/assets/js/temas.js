export function obtenerTemaCargadoLocalStorage() {
    const temaGuardado = localStorage.getItem("tema") || "claro";
    // document.documentElement.setAttribute("data-tema", temaGuardado);
    return temaGuardado;
}

export function cargarTemaLocalStorage(tema) {
    localStorage.setItem("tema", tema);
}
