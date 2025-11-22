import { Producto } from "../models/producto.js";

class AdminController {
    static async renderDashboard(req, res) {
        try {
            const { tipo } = req.query;

            if (tipo !== "admin") {
                return res.status(400).json({ message: "Tipo invalido" });
            }

            const productos = await Producto.findAll();

            if (productos.length === 0) {
                return res.render("pages/dashboard", {
                    tituloHead: "Riffhouse - Admin - Dashboard",
                    productos: [],
                    message: "No hay productos cargados",
                });
            }

            return res.render("pages/dashboard", {
                tituloHead: "Riffhouse - Admin - Dashboard",
                productos,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error al obtener los productos" });
        }
    }
}

export default AdminController;
