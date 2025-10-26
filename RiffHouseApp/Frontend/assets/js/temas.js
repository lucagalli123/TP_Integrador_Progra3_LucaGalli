import { $ } from "./utils.js";

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

// export function aplicarTema(tema, call1, call2) {
//     call1();
//     call2();
//     const temaSelect = $("tema");
//     if (temaSelect) {
//         temaSelect.value = tema;
//         temaSelect.addEventListener("change", () => {
//             const nuevoTema = temaSelect.value;
//             setTema(nuevoTema);
//             aplicarTema(nuevoTema, call1, call2);
//         });
//     }
// }
