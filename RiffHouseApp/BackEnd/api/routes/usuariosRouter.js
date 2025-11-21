import { Router } from "express";
import UsuariosController from "../controllers/usuariosController.js";
import { validarDatosLogin } from "../middlewares/usuarios/validarDatosLogin.js";

const router = Router();

router.post("/login", validarDatosLogin, UsuariosController.login);
// router.post("/", UsuariosController.crearUsuario);

export default router;
