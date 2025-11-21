import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
    res.render("pages/login", { tituloHead: "Riffhouse - Admin - Login" });
});

router.get("/registro", (req, res) => {
    res.render("pages/registro", { tituloHead: "Riffhouse - Admin - Registro" });
});

export default router;
