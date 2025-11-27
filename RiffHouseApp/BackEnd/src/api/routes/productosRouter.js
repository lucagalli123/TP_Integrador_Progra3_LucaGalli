import { Router } from "express";
import ProductosController from "../controllers/productosController.js";
import { validarDatosProducto } from "../middlewares/productos/validarDatosProducto.js";

const router = Router();

router.get("/", validarDatosProducto, ProductosController.getProductos);

export default router;
