import { Producto } from "../../models/index.js";
import ApiResponse from "../apiReponse.js";

class ProductosController {
    static async getProductos(req, res) {
        try {
            let { tipo, pag, limit, categoria } = req.query;

            if (tipo === "sinPaginar") {
                const productosSinPaginar = await Producto.findAll({
                    where: { activo: true },
                });

                if (!productosSinPaginar) {
                    return res.status(200).json(ApiResponse.success([], "No hay productos activos"));
                }

                return res.status(200).json(ApiResponse.success(productosSinPaginar, "Productos obtenidos correctamente"));
            }

            if (tipo === "paginados") {
                pag = parseInt(pag) || 1;
                limit = parseInt(limit) || 6;
                const offset = (pag - 1) * limit;

                const productos = await Producto.findAndCountAll({
                    where: { activo: true, categoria: categoria },
                    limit: limit,
                    offset: offset,
                });

                // res 1
                if (productos.rows.length === 0) {
                    return res.status(200).json(ApiResponse.success([], "No hay productos activos"));
                }

                // res 2
                const data = { totalProductos: productos.count, totalPaginas: Math.ceil(productos.count / limit), listaProductos: productos.rows };
                return res.status(200).json(ApiResponse.success(data, "Productos obtenidos correctamente"));
            }
        } catch (error) {
            console.error("Error: ", error.message);

            // res 3
            return res.status(500).json(ApiResponse.error("Error al obtener productos", error));
        }
    }

    //______________________________ EN DESHUSO POR AHORA ______________________________________________

    static async getProductoPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).send(ApiResponse.error("Producto no encontrado", null));
            }

            return res.send(producto);
        } catch (error) {
            console.error("Error: ", error.message);
            return res.status(500).send(ApiResponse.error("Error al buscar producto", error));
        }
    }
}

export default ProductosController;
