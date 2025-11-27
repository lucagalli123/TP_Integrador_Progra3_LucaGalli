import { Producto } from "../../models/producto.js";
import { Usuario } from "../../models/usuario.js";
import bcrypt from "bcrypt";
import fs from "fs";
const saltRounds = 10;

class AdminController {
    // RENDERS _________________________

    static async renderLogin(req, res) {
        res.render("admin/pages/login", {
            tituloHead: "Riffhouse - Admin - Login",
        });
    }

    static async renderDashboard(req, res) {
        try {
            const { tipo } = req.query;

            // if (tipo !== "admin") {
            //     return res.status(400).json({ message: "Tipo invalido" });
            // }

            const productos = await Producto.findAll();

            return res.render("admin/pages/dashboard", {
                tituloHead: "Riffhouse - Admin - Dashboard",
                productos,
                message: productos.length === 0 ? "No hay productos cargados" : null,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener los productos" });
        }
    }

    static async renderEditar(req, res) {
        try {
            const { id } = req.params;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            return res.render("admin/pages/editar", {
                tituloHead: "Riffhouse - Admin - Editar",
                producto,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener el producto" });
        }
    }

    static async renderAlta(req, res) {
        try {
            // const { id } = req.params;

            // const producto = await Producto.findByPk(id);

            // if (!producto) {
            //     return res.status(404).send({ message: "Producto no encontrado" });
            // }

            return res.render("admin/pages/alta", {
                tituloHead: "Riffhouse - Admin - Alta",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener el producto" });
        }
    }

    // LOGIN ______

    static async login(req, res) {
        try {
            let { email, password } = req.body;

            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(401).send({ error: "email invalido" });
            }

            const okPass = await bcrypt.compare(password, usuario.password);

            if (!okPass) {
                return res.status(401).send({ error: "contraseña invalida" });
            }

            return res.status(200).send({ message: "login correcto" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "error al loguearse" });
        }
    }

    // CREAR PRODUCTO ________

    // MEJORARLO (ESTA FLOJO)
    static async crearProducto(req, res) {
        try {
            const { marca, modelo, categoria, precio } = req.body;

            let imagen = "";
            if (req.file) {
                imagen = AdminController.#guardarArchivo(req.file, categoria);
            }

            const producto = await Producto.create({
                marca: marca,
                modelo: modelo,
                categoria: categoria,
                imagen: imagen,
                precio: parseFloat(precio),
                activo: true,
            });

            return res.send({
                message: "Producto creado con exito",
                resultado: producto,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error al crear producto",
                error: error.message,
            });
        }
    }

    // ACTUALIZAR PRODUCTO _______________

    static async actualizarProducto(req, res) {
        try {
            const { id } = req.params;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ error: "Producto no encontrado" });
            }

            const { marca, modelo, categoria, precio } = req.body;

            // imagen actual si no se sube una nueva
            let nuevaImagen = producto.imagen;

            // recupero imagen y la guardo
            if (req.file) {
                nuevaImagen = AdminController.#guardarArchivo(req.file, categoria);
            }

            await producto.update({
                marca: marca || producto.marca,
                modelo: modelo || producto.modelo,
                categoria: categoria || producto.categoria,
                precio: precio || producto.precio,
                imagen: nuevaImagen,
            });

            res.send({
                message: "Producto actualizado correctamente",
                resultado: producto,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al modificar producto" });
        }
    }

    // ACTIVAR / DESACTIVAR ________

    static async activarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ activo: true });

            return res.send({ message: "Producto activado", resultado: producto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    static async desactivarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ activo: false });

            return res.send({ message: "Producto desactivado", resultado: producto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error interno del servidor" });
        }
    }

    // GUARDAR ARCHIVOS - PRIVADO (para uso de actualizar producto)

    static #guardarArchivo(file, categoria) {
        let ext = "";

        if (file.mimetype === "image/jpeg") ext = "jpeg";
        if (file.mimetype === "image/png") ext = "png";
        if (file.mimetype === "image/avif") ext = "avif";

        const originalname = file.originalname.split(".")[0].replace(/\s/g, "-");

        const timestamp = Date.now();
        const filename = `${originalname}_${timestamp}.${ext}`;

        let destino = "";
        let carpeta = "";

        if (categoria === "Guitarras") {
            carpeta = "guitarras";
        } else if (categoria === "Bajos") {
            carpeta = "bajos";
        }

        destino = `public/uploads/${carpeta}/${filename}`;

        fs.renameSync(file.path, destino);

        return `http://localhost:3001/uploads/${carpeta}/${filename}`;
    }
}

export default AdminController;
