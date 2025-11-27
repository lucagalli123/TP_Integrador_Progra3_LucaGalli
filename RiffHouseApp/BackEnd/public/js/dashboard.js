import { $ } from "./utils.js";

// ============== DOM elementos ==============

const btnActivar = document.querySelectorAll(".btn-activar");
const btnDesactivar = document.querySelectorAll(".btn-desactivar");
const btnEditar = document.querySelectorAll(".btn-editar");

// ============== FUNCIONES ==============

// funcion para actualizar el estado del producto
async function cambiarEstadoProducto(id, accion) {
    try {
        const response = await fetch(`/admin/productos/${id}/${accion}`, {
            method: "PATCH",
        });

        const result = await response.json();

        if (!response.ok) {
            alert(`${response.status}\n${result.message}`);
            return;
        }
        window.location.reload();
    } catch (error) {
        console.error(`Ocurrio un error\n${error.name}`);
    }
}

// ============== LISTENERS ==============

// evento de los botones activar (VER VALIDACIONES)
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

        // cancelar
        btnCancel.addEventListener("click", () => (modal.style.display = "none"));

        // llamar a funcion de peticion (cambiarEstadoProducto)
        btnConfirm.onclick = async () => {
            const idProducto = btn.dataset.id;
            cambiarEstadoProducto(idProducto, "activar");
        };
    });
});

// evento de los botones desactivar (VER VALIDACIONES)
btnDesactivar.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = $("modalConfirmar");
        const btnClose = $("cerrarModal");
        const btnConfirm = $("btnSiConfirmar");
        const btnCancel = $("btnNoConfirmar");

        // mostrar modal
        modal.style.display = "block";

        $("modalConsulta").textContent = "¿Esta seguro que desea desactivar este producto?";

        // cerrar con X
        btnClose.addEventListener("click", () => (modal.style.display = "none"));

        // cancelar
        btnCancel.addEventListener("click", () => (modal.style.display = "none"));

        // llamar a funcion de peticion (cambiarEstadoProducto)
        btnConfirm.onclick = () => {
            const idProducto = btn.dataset.id;
            cambiarEstadoProducto(idProducto, "desactivar");
        };
    });
});

// evento boton editar
btnEditar.forEach(btn => {
    btn.addEventListener("click", () => {
        const idProducto = btn.dataset.id;
        window.location.href = `/admin/editar/${idProducto}`;
    });
});
