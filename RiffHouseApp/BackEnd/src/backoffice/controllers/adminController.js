import { Producto } from "../../models/producto.js";
import { Usuario } from "../../models/usuario.js";
import { Venta } from "../../models/venta.js";
import { VentaProducto } from "../../models/ventaProducto.js";
import Response from "../response.js";
import bcrypt from "bcrypt";
import fs from "fs";

class AdminController {
    // ============================= RENDERS =============================

    // render login
    static async renderLogin(req, res) {
        res.render("admin/pages/login", {
            tituloHead: "Riffhouse - Admin - Login",
        });
    }

    // render dashboard (TERMINAR BIEN EL ERROR) !!!!!!!!!!!!!!!!!!!!!!!!!!!
    static async renderDashboard(req, res) {
        try {
            const { nombre } = req.user;

            const productos = await Producto.findAll();

            return res.render("admin/pages/dashboard", {
                tituloHead: "Riffhouse - Admin - Dashboard",
                nombreUser: nombre,
                productos,
                message: productos.length === 0 ? "No hay productos cargados" : null,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener los productos" });
        }
    }

    // render editar
    static async renderEditar(req, res) {
        try {
            const { id } = req.params;
            const { nombre } = req.user;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.render("admin/pages/editar", {
                    tituloHead: "Riffhouse - Admin - Editar",
                    nombreUser: nombre,
                    producto,
                    message: "No se encontro el producto",
                });
            }

            return res.render("admin/pages/editar", {
                tituloHead: "Riffhouse - Admin - Editar",
                nombreUser: nombre,
                producto,
                message: "Producto encontrado",
            });
        } catch (error) {
            const { nombre } = req.user;
            console.error(error);
            const producto = null;
            return res.status(500).render("admin/pages/editar", {
                tituloHead: "Riffhouse - Admin - Editar",
                nombreUser: nombre,
                producto,
                message: "Ocurrio un error al obtener el producto",
            });
        }
    }

    // render alta (TERMINAR EL ERROR) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    static async renderAlta(req, res) {
        try {
            const { nombre } = req.user;
            return res.render("admin/pages/alta", {
                tituloHead: "Riffhouse - Admin - Alta",
                nombreUser: nombre,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Error al cargar la pagina" });
        }
    }

    // ============================= ACTUALIZAR PRODUCTO =============================

    static async actualizarProducto(req, res) {
        try {
            const { id } = req.params;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send(Response.error("Producto no encontrado", null));
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

            return res.status(200).send(Response.success(producto, "Producto actualizado correctamente"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(Response.error("Error al actualizar producto", error));
        }
    }

    // ============================= CREAR PRODUCTO =============================

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

            return res.status(200).send(Response.success(producto, "Producto creado con exito"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(Response.error("Error al crear producto", error));
        }
    }

    // ============================= ACTIVAR PRODUCTO =============================

    static async activarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send(Response.error("Producto no encontrado", error));
            }

            await producto.update({ activo: true });

            return res.send(Response.success(producto, "Producto activado"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(Response.error("Error al activar producto", error));
        }
    }

    // ============================= DESACTIVAR PRODUCTO =============================

    static async desactivarProducto(req, res) {
        try {
            const id = req.params.id;

            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            await producto.update({ activo: false });

            return res.send(Response.success(producto, "Producto desactivado"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(Response.error("Error al desactivar producto", error));
        }
    }

    // ============================= OBTENER TODAS LAS VENTAS =============================

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

            if (ventas.length === 0) return res.status(200).send(Response.success(ventas, "No hay ventas"));

            return res.status(200).send(Response.success(ventas, "Ventas obtenidas"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(Response.error("Error al listar ventas", error));
        }
    }

    static async crearUsuarioAdmin(req, res) {
        const saltRounds = 10;
        try {
            const { nombre, email, password } = req.body;

            const usuarioBuscado = await Usuario.findOne({ where: { email } });
            if (usuarioBuscado) return res.status(409).send(Response.error("Ya existe un usuario con ese email", null));

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const usuarioData = {
                nombre: nombre,
                email: email,
                password: hashedPassword,
            };

            const usuarioCreado = await Usuario.create(usuarioData);

            return res.status(201).send(Response.success(usuarioCreado, "Usuario creado con exito"));
        } catch (error) {
            return res.status(500).send(Response.error("Error al crear usuario", error));
        }
    }

    // ============================= GUARDAR ARCHIVOS - PRIVADO (para uso de actualizar producto) =============================

    static #guardarArchivo(file, categoria) {
        let ext = "";

        if (file.mimetype === "image/jpeg" || file.mimetype === "image/pjpeg") ext = "jpeg";
        else if (file.mimetype === "image/png") ext = "png";
        else if (file.mimetype === "image/avif") ext = "avif";
        else if (file.mimetype === "image/svg+xml") ext = "svg";
        else if (file.mimetype === "image/webp") ext = "webp";
        else if (file.mimetype === "image/bmp") ext = "bmp";
        else if (file.mimetype === "image/tiff") ext = "tiff";
        else if (file.mimetype === "image/x-icon") ext = "ico";
        else if (file.mimetype === "image/heif" || file.mimetype === "image/heic") ext = "heic";

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
