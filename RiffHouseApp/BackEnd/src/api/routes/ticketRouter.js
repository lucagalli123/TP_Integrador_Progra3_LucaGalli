import { Router } from "express";
import TicketController from "../controllers/ticketController.js";

const router = Router();

router.get("/:id/download", TicketController.descargarTicket);

export default router;
