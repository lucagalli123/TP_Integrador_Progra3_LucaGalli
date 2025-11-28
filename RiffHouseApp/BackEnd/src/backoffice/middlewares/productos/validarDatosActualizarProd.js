import Response from "../../response.js";

export function validarDatosActualizarProd(req, res, next) {
    const { id } = req.params;
    const { marca, modelo, categoria, precio } = req.body;

    // ---------------- PARAMS ----------------

    if (!id) {
        console.error("id no enviado: ", id);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    if (isNaN(Number(id))) {
        console.error("id invalido: ", id);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    // ---------------- BODY ----------------

    if (!marca || typeof marca !== "string" || marca.trim().length === 0) {
        console.error("tipo de marca invalida: ", marca);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    if (!modelo || typeof modelo !== "string" || modelo.trim().length === 0) {
        console.error("tipo de modelo invalido: ", modelo);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    const categoriasValidas = ["Guitarras", "Bajos"];
    if (!categoria || typeof categoria !== "string" || !categoriasValidas.includes(categoria)) {
        console.error("tipo de categoria invalida: ", categoria);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) < 0) {
        console.error("tipo de precio invalido: ", precio);
        return res.status(400).json(Response.error("Error al actualizar producto", null));
    }

    next();
}
