import ApiResponse from "../../apiReponse.js";

export function validarDatosCrearVenta(req, res, next) {
    const { cliente, fecha, total, productos } = req.body;

    if (!cliente || typeof cliente !== "string") {
        console.error(" Query 'cliente' invalida:", cliente);
        return res.status(400).json(ApiResponse.error("Error al procesar la venta. Intente nuevamente", null));
    }

    if (!fecha || isNaN(Date.parse(fecha))) {
        console.error(" Query 'fecha' invalida:", fecha);
        return res.status(400).json(ApiResponse.error("Error al procesar la venta. Intente nuevamente", null));
    }

    if (!total || isNaN(total)) {
        console.error(" Query 'total' invalida:", total);
        return res.status(400).json(ApiResponse.error("Error al procesar la venta. Intente nuevamente", null));
    }

    if (!productos || productos.length === 0) {
        console.error(" Query 'productos' invalida:", productos);
        return res.status(400).json(ApiResponse.error("Error al procesar la venta. Intente nuevamente", null));
    }

    for (const p of productos) {
        if (!p.id || !p.cantidad || p.cantidad <= 0 || !p.precio || isNaN(parseFloat(p.precio))) {
            console.error(" Query invalida:", p);
            return res.status(400).json(ApiResponse.error("Error al procesar la venta. Intente nuevamente", null));
        }
    }

    next();
}
