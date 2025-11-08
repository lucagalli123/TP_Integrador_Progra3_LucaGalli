import { Router } from "express";
import VentasController from "../controllers/ventasController.js";

const router = Router();

// ============= RUTAS ================

// Crear una nueva venta (con sus productos)
// router.post("/", VentasController.crearVenta);

router.post("/", VentasController.crearVenta);
router.get("/", VentasController.getVentas);
// Listar todas las ventas
// router.get("/");

// Ver detalles de una venta específica
// router.get("/:id");

// (Opcional) listar ventas por cliente o fecha
// (Opcional) anular venta (si el TP lo permite)

export default router;
