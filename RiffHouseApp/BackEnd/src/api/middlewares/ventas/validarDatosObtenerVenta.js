import ApiResponse from "../../apiReponse.js";

export function validarDatosObtenerVenta(req, res, next) {
    const { id } = req.params;

    // ---------------- PARAMS ----------------

    if (!id) {
        console.error("Params 'id' no enviado");
        return res.status(400).json(ApiResponse.error("Error al obtener venta", null));
    }

    if (isNaN(Number(id))) {
        console.error("Params 'id' invalido:", id);
        return res.status(400).json(ApiResponse.error("Error al obtener venta", null));
    }

    next();
}
