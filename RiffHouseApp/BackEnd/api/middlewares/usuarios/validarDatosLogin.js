export function validarDatosLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send({ message: "El email es obligatorio" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "El email no tiene un formato valido" });
    }

    if (!password || typeof password !== "string" || password.trim().length === 0) {
        return res.status(400).send({ message: "La contraseña es obligatoria" });
    }

    if (password.length < 4) {
        return res.status(400).send({ message: "La contraseña debe tener al menos 4 caracteres" });
    }

    next();
}
