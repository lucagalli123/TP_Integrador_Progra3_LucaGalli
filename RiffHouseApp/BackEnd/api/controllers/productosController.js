import { Producto } from "../models/index.js";

class ProductosController {
    // para el cliente ---> GET ---> (QUERY) ---> http://localhost:3001/api/productos?pag=x&limit=x&categoria=x
    static async getProductosActivosPaginados(req, res) {
        try {
            const pag = parseInt(req.query.pag);
            const limitValor = parseInt(req.query.limit);
            const categoria = req.query.categoria;
            const offsetValor = (pag - 1) * limitValor;

            const productos = await Producto.findAndCountAll({
                where: {
                    activo: true,
                    categoria: categoria,
                },
                limit: limitValor,
                offset: offsetValor,
            });

            if (productos.rows.length === 0) return res.status(200).send({ message: "No hay productos activos" });

            return res.send({
                total: productos.count,
                paginas: Math.ceil(productos.count / limitValor),
                listaProd: productos.rows,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener productos activos" });
        }
    }

    // para el admin ---> GET ---> http://localhost:3001/api/productos/todos
    static async getTodosLosProductos(req, res) {
        try {
            const todosLosProductos = await Producto.findAll();
            res.send(todosLosProductos);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    // 1 producto por id ---> GET ---> (PARAMS) ---> http://localhost:3001/api/productos/x
    static async getProductoPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            return res.send(producto);
        } catch (error) {
            console.error("Error getProductoPorId:", error);
            return res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    // crear un producto ---> POST ---> (BODY/marca-modelo-categoria-imagen-precio) ---> http://localhost:3001/api/productos/
    static async crearProducto(req, res) {
        const body = req.body;
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

    // actualizar un producto ---> PATCH ---> (BODY/marca-modelo-categoria-precio-imagen) ---> http://localhost:3001/api/productos/
    // falta ---> validacion middle ---> validar que haya cambios para realizar (que los datos ingresados sean distintos a los de la DDBB)
    static async actualizarProducto(req, res) {
        try {
            const { id } = req.params;
            const { marca, modelo, categoria, precio, imagen } = req.body;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ marca, modelo, categoria, precio, imagen });

            res.send({ message: "Producto actualizado correctamente", resultado: producto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al modificar producto" });
        }
    }

    // activar un producto ---> PATCH ---> (PARAMS) ---> http://localhost:3001/api/productos/x
    // ver que pasa si el producto ya esta activo...
    // falta validar datos con middle
    static async activarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ activo: true, where: { id: id } });
            return res.status(200).send({ message: "Producto activado", resultado: producto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    // desactivar un producto ---> PATCH ---> (PARAMS) ---> http://localhost:3001/api/productos/x
    // ver que pasa si el producto ya esta inactivo...
    // falta validar datos con middle
    static async desactivarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ activo: false, where: { id: id } });
            return res.status(200).send({ message: "Producto desactivado", resultado: producto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error interno del servidor" });
        }
    }
}

export default ProductosController;
