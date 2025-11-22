import { Router } from "express";
import AdminController from "../controllers/adminController.js";
const router = Router();

router.get("/login", (req, res) => {
    res.render("pages/login", { tituloHead: "Riffhouse - Admin - Login" });
});

router.get("/dashboard", AdminController.renderDashboard);

router.get("/editar", (erq, res) => {
    res.render("pages/editar", { tituloHead: "Riffhouse - Admin - Editar" });
});

// router.get("/editar");  PENDIENTE |||||||||||

export default router;
