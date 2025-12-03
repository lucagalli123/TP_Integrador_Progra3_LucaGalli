import { $ } from "./utils.js";

$("btnCerrarSesion").addEventListener("click", async () => {
    try {
        await fetch("/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        document.cookie = "accessToken=; Max-Age=0; path=/;";

        window.location.href = "/admin/login";
    } catch (error) {
        console.error("Error al cerrar sesion", error);
    }
});

$("usuarioMenu").addEventListener("mouseleave", () => {
    setTimeout(() => {
        $("usuarioMenu").classList.add("oculto");
    }, 300);
});
