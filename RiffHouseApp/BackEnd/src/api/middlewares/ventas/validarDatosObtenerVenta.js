import ApiResponse from "../../apiReponse.js";

export function validarDatosObtenerVenta(req, res, next) {
    const { id } = req.params;

    if (!id) {
        console.error("Params 'id' no enviado");
        return res.status(400).json(ApiResponse.error("Falta el parámetro ID", null));
    }

    if (isNaN(Number(id))) {
        console.error("Params 'id' invalido:", id);
        return res.status(400).json(ApiResponse.error("El ID debe ser numérico", null));
    }

    next();
}
