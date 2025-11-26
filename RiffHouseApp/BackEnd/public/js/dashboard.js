import { $ } from "./utils.js";

const btnActivar = document.querySelectorAll(".btn-activar");
const btnDesactivar = document.querySelectorAll(".btn-desactivar");
const btnEditar = document.querySelectorAll(".btn-editar");

// funcion para actualizar el estado del producto
async function cambiarEstadoProducto(id, accion) {
    try {
        await fetch(`/admin/productos/${id}/${accion}`, {
            method: "PATCH",
        });

        window.location.reload();
    } catch (error) {
        console.error("Error al cambiar estado del producto:", error);
    }
}

// evento de los botones activar
// ver temas de validaciones, manejo de errores, etc... |||||||||||||||||||||||||||||||||||||||||||||||
btnActivar.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = $("modalConfirmar");
        // console.log(modal);
        const btnClose = $("cerrarModal");
        const btnConfirm = $("btnSiConfirmar");
        const btnCancel = $("btnNoConfirmar");

        // mostrar modal
        modal.style.display = "block";

        $("modalConsulta").textContent = "¿Esta seguro que desea activar este producto?";

        // cerrar con X
        btnClose.addEventListener("click", () => (modal.style.display = "none"));

        // cancelar compra
        btnCancel.addEventListener("click", () => (modal.style.display = "none"));

        btnConfirm.onclick = async () => {
            try {
                const idProducto = btn.dataset.id;
                cambiarEstadoProducto(idProducto, "activar");
            } catch (error) {
                console.log(error);
            }
        };
    });
});

// evento de los botones desactivar
// ver temas de validaciones, manejo de errores, etc... |||||||||||||||||||||||||||||||||||||||||||||||
btnDesactivar.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = $("modalConfirmar");
        // console.log(modal);
        const btnClose = $("cerrarModal");
        const btnConfirm = $("btnSiConfirmar");
        const btnCancel = $("btnNoConfirmar");

        // mostrar modal
        modal.style.display = "block";

        $("modalConsulta").textContent = "¿Esta seguro que desea desactivar este producto?";

        // cerrar con X
        btnClose.addEventListener("click", () => (modal.style.display = "none"));

        // cancelar compra
        btnCancel.addEventListener("click", () => (modal.style.display = "none"));

        btnConfirm.onclick = async () => {
            try {
                const idProducto = btn.dataset.id;
                cambiarEstadoProducto(idProducto, "desactivar");
            } catch (error) {
                console.log(error); // <----- DESPUES TENGO QUE VER COMO MANEJO ESTE ERROR
            }
        };
    });
});

// analizar bien esto |||||||||||||||||||||||||||||||||||||||||
btnEditar.forEach(btn => {
    btn.addEventListener("click", () => {
        const idProducto = btn.dataset.id;
        window.location.href = `/admin/editar/${idProducto}`;
    });
});
