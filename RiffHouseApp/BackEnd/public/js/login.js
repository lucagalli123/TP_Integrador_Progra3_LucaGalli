const form = document.getElementById("loginForm");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/usuarios/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const resultado = await response.json();

        if (response.ok) {
            window.location.href = "/admin/dashboard";
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
