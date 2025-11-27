import { Venta, Producto, VentaProducto } from "../../models/index.js";
import ApiResponse from "../apiReponse.js";

class VentasController {
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

            const data = {
                venta: ventaCreada,
                productosAsociados: ventaProductosCreados,
            };

            return res.status(201).json(ApiResponse.success(data, "Venta creada correctamente"));
        } catch (error) {
            console.error(`Error: , ${error.message}`);
            return res.status(500).json(ApiResponse.error("Error al crear venta", error));
        }
    }

    // ver para que puede servir
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

            if (!venta) return res.status(404).json(ApiResponse.error("No se encontro la venta que busca", null));

            res.status(200).send({ message: "Busqueda exitosa", resultado: venta });
        } catch (error) {
            console.error("Error: ", error.message);
            return res.status(500).json(ApiResponse.error("Error al listar ventas", error));
        }
    }

    // ___________________ en deshuso por ahora ___________________

    // validar datos...
    // static async getVentas(req, res) {
    //     try {
    //         const ventas = await Venta.findAll({
    //             attributes: ["cliente", "fecha", "total"],
    //             include: [
    //                 {
    //                     model: VentaProducto,
    //                     attributes: ["cantidad", "precioUnitario"],
    //                     include: [
    //                         {
    //                             model: Producto,
    //                             attributes: ["marca", "modelo", "categoria"],
    //                         },
    //                     ],
    //                 },
    //             ],
    //         });

    //         res.status(200).send({ message: "Busqueda exitosa", resultado: ventas });
    //     } catch (error) {
    //         console.error("Error al listar ventas:", error);
    //         return res.status(500).send({ message: "Error al listar ventas", error: error.message });
    //     }
    // }

    // ___________________ en deshuso por ahora ___________________
}

export default VentasController;
