import { Router } from "express";
import ProductosController from "../controllers/productosController.js";

const router = Router();

router.get("/", ProductosController.getProductos);
router.get("/:id", ProductosController.getProductoPorId); //
router.post("/", ProductosController.crearProducto); //
router.patch("/:id", ProductosController.actualizarProducto); //
router.patch("/:id/activar", ProductosController.activarProducto); //
router.patch("/:id/desactivar", ProductosController.desactivarProducto); //

// router.post();

export default router;
