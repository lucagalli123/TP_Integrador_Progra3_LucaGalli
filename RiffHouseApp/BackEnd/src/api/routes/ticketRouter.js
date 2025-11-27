import { Router } from "express";
import TicketController from "../controllers/ticketController.js";
import { validarDatosObtenerTicket } from "../middlewares/ticket/validarDatosTicket.js";

const router = Router();

router.get("/:id/download", validarDatosObtenerTicket, TicketController.descargarTicket);

export default router;
