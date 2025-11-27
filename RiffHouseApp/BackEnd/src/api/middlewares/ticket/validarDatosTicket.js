import ApiResponse from "../../apiReponse.js";

export function validarDatosObtenerTicket(req, res, next) {
    const { id } = req.params;

    if (!id) {
        console.error("Params 'id' no enviado");
        return res.status(400).json(ApiResponse.error("Falta el parametro ID", null));
    }

    if (isNaN(Number(id))) {
        console.error("Params 'id' invalido:", id);
        return res.status(400).json(ApiResponse.error("El ID debe ser numerico", null));
    }

    next();
}
