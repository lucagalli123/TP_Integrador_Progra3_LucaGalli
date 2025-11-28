import Response from "../../response.js";

export function validarDatosObtenerVenta(req, res, next) {
    const { id } = req.params;

    // ---------------- PARAMS ----------------

    if (!id) {
        console.error("id no enviado: ", id);
        return res.status(400).json(Response.error("Error al dobtener ventas", null));
    }

    if (isNaN(Number(id))) {
        console.error("id invalido:", id);
        return res.status(400).json(Response.error("Error al obtener ventas", null));
    }

    next();
}
