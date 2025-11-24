import { Router } from "express";
import AdminController from "../controllers/adminController.js";
const router = Router();

router.get("/login", (req, res) => {
    res.render("pages/login", { tituloHead: "Riffhouse - Admin - Login" });
});

router.get("/dashboard", AdminController.renderDashboard);

router.get("/editar/:id", AdminController.renderEditar);

export default router;
