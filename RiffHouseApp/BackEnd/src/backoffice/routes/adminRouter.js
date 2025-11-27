import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import { validarDatosLogin } from "../middlewares/usuarios/validarDatosLogin.js";
import upload from "../multer/multerConfig.js";
const router = Router();

router.get("/login", AdminController.renderLogin);

router.get("/dashboard", AdminController.renderDashboard);

router.get("/editar/:id", AdminController.renderEditar);

router.get("/alta", AdminController.renderAlta);

router.post("/usuarios/login", validarDatosLogin, AdminController.login);

router.post("/productos", upload.single("imagen"), AdminController.crearProducto);

router.patch("/productos/:id", upload.single("imagen"), AdminController.actualizarProducto);

router.patch("/productos/:id/activar", AdminController.activarProducto);

router.patch("/productos/:id/desactivar", AdminController.desactivarProducto);

// router.post("/upload", upload.single("archivo"), AdminController.cargarImagen);

export default router;
