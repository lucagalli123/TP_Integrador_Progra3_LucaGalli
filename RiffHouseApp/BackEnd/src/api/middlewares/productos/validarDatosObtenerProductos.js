import ApiResponse from "../../apiReponse.js";

export function validarDatosObtenerProductos(req, res, next) {
    let { tipo, pag, limit, categoria } = req.query;

    if (tipo === "sinPaginar") {
        return next();
    }

    if (tipo === "paginados") {
        if (!pag || isNaN(parseInt(pag)) || parseInt(pag) < 1) {
            console.error(" Query 'pag' invalida:", pag);
            return res.status(400).json(ApiResponse.error("Error al obtener los productos", null));
        }

        if (!limit || isNaN(parseInt(limit)) || parseInt(limit) < 1) {
            console.error(" Query 'limit' invalida:", pag);
            return res.status(400).json(ApiResponse.error("Error al obtener los productos", null));
        }

        if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
            console.error(" Query 'categoria' invalida:", pag);
            return res.status(400).json(ApiResponse.error("Error al obtener los productos", null));
        }

        next();
    }

    // ---------------- QUERY ----------------
}
