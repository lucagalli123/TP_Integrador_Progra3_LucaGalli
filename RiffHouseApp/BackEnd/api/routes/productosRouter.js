import { Router } from "express";
import ProductosController from "../controllers/productosController.js";

const router = Router();

router.get("/", ProductosController.getProductos);
router.get("/:id", ProductosController.getProductoPorId); //
router.post("/", ProductosController.crearProducto); //
router.patch("/:id", ProductosController.actualizarProducto); //
router.patch("/:id/activar", ProductosController.activarProducto); // cambiar a patch
router.patch("/:id/desactivar", ProductosController.desactivarProducto); // cambiar a patch

// router.post();

export default router;
