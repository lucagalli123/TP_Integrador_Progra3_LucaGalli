import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { validarDatosLogin } from "../middlewares/usuarios/validarDatosLogin.js";

const router = Router();

router.post("/login", validarDatosLogin, AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

export default router;
