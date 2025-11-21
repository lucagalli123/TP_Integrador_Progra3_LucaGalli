const form = document.getElementById("registroForm");
const btnVolver = document.getElementById("btnVolver");

form.addEventListener("submit", async e => {
    e.preventDefault();

    console.log("entrando al event");
    const nombre = document.getElementById("inputNombre").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    try {
        const response = await fetch("/api/usuarios/", {
            method: "POST",
            body: JSON.stringify({ nombre, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const resultado = await response.json();
        // VALIDAR TODO |||||||||||||||||||||||||||||||||||| (del lado del back claro)
        if (response.ok) {
            alert("Usuario Registrado!");
            // window.location.href = "/admin/dashboard";
        } else {
            // VER DESPUES COMO MOSTRAR EL ERROR ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            alert(resultado.message);
            console.error("error");
        }
    } catch (err) {
        console.error("Error en login:", err);
        // VER DESPUES TEMA ERROR DE LA PETICION AL ENVIARLA ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    }
});

btnVolver.addEventListener("click", () => {
    window.location.href = "/admin/login";
});
