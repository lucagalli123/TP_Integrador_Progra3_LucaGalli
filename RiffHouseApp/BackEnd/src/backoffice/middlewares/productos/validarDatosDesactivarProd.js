import Response from "../../response.js";

export function validarDatosDesactivarProd(req, res, next) {
    const { id } = req.params;

    // ---------------- PARAMS ----------------

    if (!id) {
        console.error("Params 'id' no enviado");
        return res.status(400).json(Response.error("Error al desactivar producto", null));
    }

    if (isNaN(Number(id))) {
        console.error("Params 'id' invalido:", id);
        return res.status(400).json(Response.error("Error al desactivar producto", null));
    }

    next();
}
