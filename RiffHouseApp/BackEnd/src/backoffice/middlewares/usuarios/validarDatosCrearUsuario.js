import Response from "../../response.js";

export function validarDatosCrearUsuario(req, res, next) {
    const { nombre, email, password } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
        console.error("Nombre invalido:", nombre);
        return res.status(400).send(Response.error("Nombre invalido", null));
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        console.error("Email vacio o tipo invalido:", email);
        return res.status(400).send(Response.error("Email invalido", null));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error("Email con formato invalido:", email);
        return res.status(400).send(Response.error("Email con formato invalido", null));
    }

    if (!password || typeof password !== "string") {
        console.error("Contraseña invalida:", password);
        return res.status(400).send(Response.error("Contraseña invalida", null));
    }

    const passLength = password.trim().length;
    if (passLength < 8 || passLength > 12) {
        console.error("Contraseña con longitud invalida:", password);
        return res.status(400).send(Response.error("La contraseña debe tener entre 8 y 12 caracteres", null));
    }

    next();
}
