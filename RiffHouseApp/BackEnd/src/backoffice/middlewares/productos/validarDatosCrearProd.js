import Response from "../../response.js";

export function validarDatosCrearProd(req, res, next) {
    const { marca, modelo, categoria, precio } = req.body;

    // ---------------- BODY ----------------

    if (!marca || typeof marca !== "string" || marca.trim().length === 0) {
        console.error("tipo de marca invalida: ", marca);
        return res.status(400).json(Response.error("Error al crear producto", null));
    }

    if (!modelo || typeof modelo !== "string" || modelo.trim().length === 0) {
        console.error("tipo de modelo invalido: ", modelo);
        return res.status(400).json(Response.error("Error al crear producto", null));
    }

    const categoriasValidas = ["Guitarras", "Bajos"];
    if (!categoria || typeof categoria !== "string" || !categoriasValidas.includes(categoria)) {
        console.error("tipo de categoria invalida: ", categoria);
        return res.status(400).json(Response.error("Error al crear producto", null));
    }

    if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) < 0) {
        console.error("tipo de precio invalido: ", precio);
        return res.status(400).json(Response.error("Error al crear producto", null));
    }

    next();
}
