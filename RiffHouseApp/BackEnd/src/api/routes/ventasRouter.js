import { Router } from "express";
import VentasController from "../controllers/ventasController.js";
import { validarDatosCrearVenta } from "../middlewares/ventas/validarDatosCrearVenta.js";
import { validarDatosObtenerVenta } from "../middlewares/ventas/validarDatosObtenerVenta.js";

const router = Router();

router.post("/", validarDatosCrearVenta, VentasController.crearVenta);

router.get("/:id", validarDatosObtenerVenta, VentasController.getVentaPorId);

export default router;
