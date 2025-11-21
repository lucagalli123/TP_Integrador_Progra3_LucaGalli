import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
    res.render("pages/login", { tituloHead: "Riffhouse - Admin - Login" });
});

export default router;
