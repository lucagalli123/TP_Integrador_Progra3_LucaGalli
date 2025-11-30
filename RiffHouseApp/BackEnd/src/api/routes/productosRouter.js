import { Router } from "express";
import ProductosController from "../controllers/productosController.js";
import { validarDatosObtenerProductos } from "../middlewares/productos/validarDatosObtenerProductos.js";
import { validarDatosObtenerProducto } from "../middlewares/productos/validarDatosObtenerProducto.js";

const router = Router();

router.get("/", validarDatosObtenerProductos, ProductosController.getProductos);
router.get("/:id", validarDatosObtenerProducto, ProductosController.getProductoPorId);

export default router;
