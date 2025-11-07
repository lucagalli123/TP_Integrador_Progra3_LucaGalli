import { Venta } from "../models/venta.js";
import { VentaProducto } from "../models/ventaProducto.js";
import { Producto } from "../models/producto.js";

class VentasController {
    // Crear una nueva venta (con sus productos)

    static async crearVenta(req, res) {
        try {
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    // VENTA MODEL---------------------
    // id, cliente, fecha, total

    // TICKET DEL LOCALSTORAGE---------
    // cliente, productos, fecha, total

    // VENTA_PRODUCTO MODEL -----------
    // idVenta, idProducto, cantidad, precioUnitario

    static async probar(req, res) {
        const prodId = req.params.id; // producto

        const { cliente, fecha, total, productos } = req.body; // ticket del localstorage

        try {
            this.#crearProducto();
        } catch (error) {}
    }

    static async #crearProducto(datosProducto) {
        try {
            const producto = await Producto.create({
                marca: body.marca,
                modelo: body.modelo,
                categoria: body.categoria,
                imagen: body.imagen,
                precio: parseFloat(body.precio),
                activo: true,
            });
            return res.send({ message: "Producto creado con exito", resultado: producto });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al crear producto", error: error.message });
        }
    }

    // listar todas las ventas
    // ver detalles de una venta
}

export default VentasController;
