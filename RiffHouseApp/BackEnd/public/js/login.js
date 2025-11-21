const form = document.getElementById("loginForm");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");

async function loguearse(email, password) {
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
    } catch (error) {
        console.error("Error en login:", error);
        // VER DESPUES TEMA ERROR DE LA PETICION AL ENVIARLA ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    }
}

form.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    await loguearse(email, password);
});

btnAccesoRapido.addEventListener("click", async () => {
    await loguearse("moni@example.com", "1234");
});
