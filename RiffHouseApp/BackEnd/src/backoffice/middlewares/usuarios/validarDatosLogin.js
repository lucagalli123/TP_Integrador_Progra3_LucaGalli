export function validarDatosLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        console.error("tipo de email invalido: ", email);
        return res.status(400).send(Response.error("Error al loguearse", null));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error("tipo de email invalido: ", email);
        return res.status(400).send(Response.error("Error al loguearse", null));
    }

    if (!password || typeof password !== "string" || password.trim().length === 0) {
        console.error("tipo de password invalido: ", password);
        return res.status(400).send(Response.error("Error al loguearse", null));
    }

    next();
}
