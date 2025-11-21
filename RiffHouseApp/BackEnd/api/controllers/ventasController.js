import { Venta, Producto, VentaProducto } from "../models/index.js";

class VentasController {
    // Crear una nueva venta (con sus productos)

    // VENTA MODEL---------------------
    // id, cliente, fecha, total

    // TICKET DEL LOCALSTORAGE---------
    // cliente, productos, fecha, total

    // VENTA_PRODUCTO MODEL -----------
    // idVenta, idProducto, cantidad, precioUnitario

    // validar datos...
    static async crearVenta(req, res) {
        try {
            let { cliente, fecha, total, productos } = req.body;

            total = parseFloat(total);

            const ventaCreada = await Venta.create({
                cliente,
                fecha,
                total,
            });

            const ventaProductosCreados = [];

            for (const p of productos) {
                let producto = await Producto.findOne({
                    where: { id: p.id },
                });

                const ventaProducto = await VentaProducto.create({
                    idVenta: ventaCreada.id,
                    idProducto: producto.id,
                    cantidad: p.cantidad,
                    precioUnitario: parseFloat(p.precio),
                });

                ventaProductosCreados.push(ventaProducto);
            }

            return res.status(201).send({
                message: "Venta creada correctamente",
                venta: ventaCreada,
                productosAsociados: ventaProductosCreados,
            });
        } catch (error) {
            console.error("Error al crear venta:", error);
            return res.status(500).send({ message: "Error al crear venta", error: error.message });
        }
    }

    // listar todas las ventas

    // VENTA MODEL---------------------
    // id, cliente, fecha, total

    // VENTA_PRODUCTO MODEL -----------
    // idVenta, idProducto, cantidad, precioUnitario

    // validar datos...
    static async getVentas(req, res) {
        try {
            const ventas = await Venta.findAll({
                attributes: ["cliente", "fecha", "total"],
                include: [
                    {
                        model: VentaProducto,
                        attributes: ["cantidad", "precioUnitario"],
                        include: [
                            {
                                model: Producto,
                                attributes: ["marca", "modelo", "categoria"],
                            },
                        ],
                    },
                ],
            });

            res.status(200).send({ message: "Busqueda exitosa", resultado: ventas });
        } catch (error) {
            console.error("Error al listar ventas:", error);
            return res.status(500).send({ message: "Error al listar ventas", error: error.message });
        }
    }

    static async getVentaPorId(req, res) {
        try {
            const { id } = req.params;

            const venta = await Venta.findByPk(id, {
                include: [
                    {
                        model: VentaProducto,
                        attributes: ["cantidad", "precioUnitario"],
                        include: [
                            {
                                model: Producto,
                                attributes: ["marca", "modelo", "categoria", "precio"],
                            },
                        ],
                    },
                ],
            });

            if (!venta) return res.status(404).send({ message: "No se encontro la venta que busca" });

            res.status(200).send({ message: "Busqueda exitosa", resultado: venta });
        } catch (error) {
            console.error("Error al listar ventas:", error);
            return res.status(500).send({ message: "Error al listar ventas", error: error.message });
        }
    }
}

export default VentasController;
