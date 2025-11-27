import ApiResponse from "../../apiReponse.js";

export function validarDatosObtenerTicket(req, res, next) {
    const { id } = req.params;

    if (!id) {
        console.error("Params 'id' no enviado");
        return res.status(400).send("Error al descargar ticket");
    }

    if (isNaN(Number(id))) {
        console.error("Params 'id' invalido:", id);
        return res.status(400).send("Error al descargar ticket");
    }

    next();
}
