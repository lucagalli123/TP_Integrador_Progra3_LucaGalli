import { Router } from "express";
import AdminController from "../controllers/adminController.js";

// import upload/multer
import upload from "../multer/multerConfig.js";

// import middlewares
import { validarDatosLogin } from "../middlewares/usuarios/validarDatosLogin.js";
import { validarDatosActualizarProd } from "../middlewares/productos/validarDatosActualizarProd.js";
import { validarDatosCrearProd } from "../middlewares/productos/validarDatosCrearProd.js";
import { validarDatosActivarProd } from "../middlewares/productos/validarDatosActivarProd.js";
import { validarDatosDesactivarProd } from "../middlewares/productos/validarDatosDesactivarProd.js";

// router
const router = Router();

// ya esta
router.get("/login", AdminController.renderLogin);

// ya esta
router.get("/dashboard", AdminController.renderDashboard);

router.get("/editar/:id", AdminController.renderEditar);

router.get("/alta", AdminController.renderAlta);

router.post("/usuarios/login", validarDatosLogin, AdminController.login);

router.post("/productos", upload.single("imagen"), validarDatosCrearProd, AdminController.crearProducto);

router.patch("/productos/:id", upload.single("imagen"), validarDatosActualizarProd, AdminController.actualizarProducto);

router.patch("/productos/:id/activar", validarDatosActivarProd, AdminController.activarProducto);

router.patch("/productos/:id/desactivar", validarDatosDesactivarProd, AdminController.desactivarProducto);

export default router;
