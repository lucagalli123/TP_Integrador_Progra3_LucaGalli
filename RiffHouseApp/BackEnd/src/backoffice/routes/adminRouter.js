import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import { validarDatosLogin } from "../middlewares/usuarios/validarDatosLogin.js";
import upload from "../multer/multerConfig.js";
import { validarDatosActualizarProd } from "../middlewares/productos/validarDatosActualizarProd.js";

const router = Router();

// ya esta
router.get("/login", AdminController.renderLogin);

// ya esta
router.get("/dashboard", AdminController.renderDashboard);

// ya esta
router.get("/editar/:id", AdminController.renderEditar);

// ya esta
router.get("/alta", AdminController.renderAlta);

router.post("/usuarios/login", validarDatosLogin, AdminController.login);

router.post("/productos", upload.single("imagen"), AdminController.crearProducto);

// en proceso
router.patch("/productos/:id", upload.single("imagen"), validarDatosActualizarProd, AdminController.actualizarProducto);

router.patch("/productos/:id/activar", AdminController.activarProducto);

router.patch("/productos/:id/desactivar", AdminController.desactivarProducto);

// router.post("/upload", upload.single("archivo"), AdminController.cargarImagen);

export default router;
