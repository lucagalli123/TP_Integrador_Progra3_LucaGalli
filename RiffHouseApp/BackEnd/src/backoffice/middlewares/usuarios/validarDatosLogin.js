export function validarDatosLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send({ error: "el email es obligatorio" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ error: "el email no tiene un formato valido" });
    }

    if (!password || typeof password !== "string" || password.trim().length === 0) {
        return res.status(400).send({ error: "la contraseña es obligatoria" });
    }

    next();
}
