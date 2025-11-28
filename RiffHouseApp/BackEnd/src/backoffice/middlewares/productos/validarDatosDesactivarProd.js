import Response from "../../response.js";

export function validarDatosDesactivarProd(req, res, next) {
    const { id } = req.params;

    // ---------------- PARAMS ----------------

    if (!id) {
        console.error("id no enviado: ", id);
        return res.status(400).json(Response.error("Error al desactivar producto", null));
    }

    if (isNaN(Number(id))) {
        console.error("id invalido: ", id);
        return res.status(400).json(Response.error("Error al desactivar producto", null));
    }

    next();
}
