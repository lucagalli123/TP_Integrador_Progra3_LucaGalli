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
