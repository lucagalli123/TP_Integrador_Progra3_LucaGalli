import { Router } from "express";
import VentasController from "../controllers/ventasController.js";
import { validarDatosVenta } from "../middlewares/ventas/validarDatosVenta.js";

const router = Router();

router.post("/", validarDatosVenta, VentasController.crearVenta);

router.get("/:id", VentasController.getVentaPorId);

export default router;
