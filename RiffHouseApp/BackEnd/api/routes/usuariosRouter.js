import { Router } from "express";
import UsuariosController from "../controllers/usuariosController.js";

const router = Router();

router.post("/login", UsuariosController.login);
router.post("/", UsuariosController.crearUsuario);

export default router;
