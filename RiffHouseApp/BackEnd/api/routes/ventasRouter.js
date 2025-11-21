import { Router } from "express";
import VentasController from "../controllers/ventasController.js";
import { validarDatosVenta } from "../middlewares/ventas/validarDatosVenta.js";

const router = Router();

// ============= RUTAS ================

// Crear una nueva venta (con sus productos)
// router.post("/", VentasController.crearVenta);

router.post("/", validarDatosVenta, VentasController.crearVenta);
router.get("/", VentasController.getVentas);
router.get("/:id", VentasController.getVentaPorId);

export default router;
