export function validarDatosVenta(req, res, next) {
    const { cliente, fecha, total, productos } = req.body;

    if (!cliente || typeof cliente !== "string") {
        return res.status(400).send({ error: "El nombre del cliente es obligatorio" });
    }

    if (!fecha || isNaN(Date.parse(fecha))) {
        return res.status(400).send({ error: "La fecha no es valida" });
    }

    if (!total || isNaN(total)) {
        return res.status(400).send({ error: "El total debe ser un numero" });
    }

    if (!productos || productos.length === 0) {
        return res.status(400).send({ error: "Debe haber al menos un producto" });
    }

    for (const p of productos) {
        if (!p.id) return res.status(400).send({ error: "Producto sin ID" });
        if (!p.cantidad || p.cantidad <= 0) return res.status(400).send({ error: "Cantidad invalida" });
        if (!p.precio || isNaN(parseFloat(p.precio))) return res.status(400).send({ error: "Precio invalido" });
    }

    next();
}
