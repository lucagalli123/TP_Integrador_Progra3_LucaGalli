import ApiResponse from "../../apiReponse.js";

export function validarDatosProducto(req, res, next) {
    let { pag, limit, categoria } = req.query;

    // ---------------- QUERY ----------------

    if (!pag || isNaN(parseInt(pag)) || parseInt(pag) < 1) {
        console.error(" Query 'pag' invalida:", pag);
        return res.status(400).json(ApiResponse.error("Error al cargar los productos. Intente nuevamente", null));
    }

    if (!limit || isNaN(parseInt(limit)) || parseInt(limit) < 1) {
        console.error(" Query 'limit' invalida:", pag);
        return res.status(400).json(ApiResponse.error("Error al cargar los productos. Intente nuevamente", null));
    }

    if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
        console.error(" Query 'categoria' invalida:", pag);
        return res.status(400).json(ApiResponse.error("Error al cargar los productos. Intente nuevamente", null));
    }

    next();
}
