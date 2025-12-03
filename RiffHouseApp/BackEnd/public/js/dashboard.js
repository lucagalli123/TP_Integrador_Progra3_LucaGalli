import { authFetch } from "./autFetch.js";
import { $, getTema, cambiarTemaFooter, cambiarTemaHeader, cambiarTemaMain, cambiarTemaTitulo } from "./utils.js";

// ======================= FUNCIONES =======================

function cambiarTemaUserMenu(userMenu, tema) {
    if (tema === "claro") {
        userMenu.classList.remove("cerrar-sesion-oscuro");
        userMenu.classList.add("cerrar-sesion-claro");
    } else {
        userMenu.classList.remove("cerrar-sesion-claro");
        userMenu.classList.add("cerrar-sesion-oscuro");
    }
}

function cambiarTemaUserTabla(tabla, trProductos, tema) {
    if (tema === "claro") {
        tabla.classList.remove("tabla-productos-oscuro");
        tabla.classList.add("tabla-productos-claro");

        trProductos.forEach(tr => {
            if (tr.classList.contains("green")) {
                tr.classList.remove("oscuro-activo");
                tr.classList.add("claro-activo");
            } else {
                tr.classList.remove("oscuro-inactivo");
                tr.classList.add("claro-inactivo");
            }

            tr.classList.add("claro");
            tr.classList.remove("oscuro");
        });
    } else {
        tabla.classList.remove("tabla-productos-claro");
        tabla.classList.add("tabla-productos-oscuro");

        trProductos.forEach(tr => {
            if (tr.classList.contains("green")) {
                tr.classList.remove("claro-activo");
                tr.classList.add("oscuro-activo");
            } else {
                tr.classList.remove("claro-inactivo");
                tr.classList.add("oscuro-inactivo");
            }

            tr.classList.add("oscuro");
            tr.classList.remove("claro");
        });
    }
}

// ======================= CARGA DOM =======================

document.addEventListener("DOMContentLoaded", () => {
    const tema = getTema() || "claro";

    // elementos del DOM
    const temaSelect = $("temaSelect");
    const usuarioHeader = $("usuarioHeader");
    const usuarioMenu = $("usuarioMenu");
    const tablaProductos = $("tablaProductos");
    const trProductos = document.querySelectorAll(".trProd");

    temaSelect.value = tema;

    cambiarTemaHeader("header", tema);
    cambiarTemaTitulo("titulo", tema);
    cambiarTemaMain("dashboard", tema);
    cambiarTemaFooter("footer", tema);
    cambiarTemaUserMenu(usuarioMenu, tema);
    cambiarTemaUserTabla(tablaProductos, trProductos, tema);

    // ======================= EVENTOS =======================

    temaSelect.addEventListener("change", () => {
        const temaNuevo = temaSelect.value;

        localStorage.setItem("tema", temaNuevo);
        document.documentElement.setAttribute("data-tema", temaNuevo);

        cambiarTemaHeader("header", temaNuevo);
        cambiarTemaTitulo("titulo", temaNuevo);
        cambiarTemaMain("dashboard", temaNuevo);
        cambiarTemaFooter("footer", temaNuevo);
        cambiarTemaUserMenu(usuarioMenu, temaNuevo);
        cambiarTemaUserTabla(tablaProductos, trProductos, temaNuevo);
    });

    usuarioHeader.addEventListener("click", () => {
        usuarioMenu.classList.toggle("oculto");
    });

    // ======================= BOTONES DE PRODUCTOS =======================

    const btnActivar = document.querySelectorAll(".btn-activar");
    const btnDesactivar = document.querySelectorAll(".btn-desactivar");
    const btnEditar = document.querySelectorAll(".btn-editar");

    // producto (activar/desactivar)
    async function cambiarEstadoProducto(id, accion) {
        try {
            const response = await authFetch(`/admin/productos/${id}/${accion}`, {
                method: "PATCH",
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                alert(`${response.status}\n${result.message}`);
                return;
            }

            window.location.reload();
        } catch (error) {
            console.error(`Ocurrio un error: ${error.name}`);
        }
    }

    // btn activar
    btnActivar.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = $("modalConfirmar");
            const btnClose = $("cerrarModal");
            const btnConfirm = $("btnSiConfirmar");
            const btnCancel = $("btnNoConfirmar");

            modal.style.display = "block";
            $("modalConsulta").textContent = "¿Esta seguro que desea activar este producto?";

            btnClose.onclick = () => (modal.style.display = "none");
            btnCancel.onclick = () => (modal.style.display = "none");

            btnConfirm.onclick = () => {
                cambiarEstadoProducto(btn.dataset.id, "activar");
            };
        });
    });

    // btn desactivar
    btnDesactivar.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = $("modalConfirmar");
            const btnClose = $("cerrarModal");
            const btnConfirm = $("btnSiConfirmar");
            const btnCancel = $("btnNoConfirmar");

            modal.style.display = "block";
            $("modalConsulta").textContent = "¿Esta seguro que desea eliminar este producto?";

            btnClose.onclick = () => (modal.style.display = "none");
            btnCancel.onclick = () => (modal.style.display = "none");

            btnConfirm.onclick = () => {
                cambiarEstadoProducto(btn.dataset.id, "desactivar");
            };
        });
    });

    //  btn editar
    btnEditar.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = `/admin/editar/${btn.dataset.id}`;
        });
    });
});
