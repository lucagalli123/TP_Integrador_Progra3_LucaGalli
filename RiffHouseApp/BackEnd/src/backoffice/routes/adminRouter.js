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
import { validarDatosCrearUsuario } from "../middlewares/usuarios/validarDatosCrearUsuario.js";
import { verificarTokenApi } from "../middlewares/auth/verificarTokenApi.js";
import { verificarTokenRender } from "../middlewares/auth/verificarTokenRenders.js";
// import { validarDatosObtenerVenta } from "../middlewares/ventas/validarDatosObtenerVentas.js";

// router
const router = Router();

// ========== RUTAS DE RENDERS ==========

router.get("/login", AdminController.renderLogin);

router.get("/dashboard", verificarTokenRender, AdminController.renderDashboard);

router.get("/editar/:id", verificarTokenRender, AdminController.renderEditar);

router.get("/alta", verificarTokenRender, AdminController.renderAlta);

// ========== RUTAS DE CRUD (API) ==========

router.get("/ventas", verificarTokenApi, AdminController.getVentas);

router.post("/usuarios", validarDatosCrearUsuario, AdminController.crearUsuarioAdmin);

// router.post("/usuarios/login", verificarToken, validarDatosLogin, AdminController.login);

router.post("/productos", verificarTokenApi, upload.single("imagen"), validarDatosCrearProd, AdminController.crearProducto);

router.patch("/productos/:id", verificarTokenApi, upload.single("imagen"), validarDatosActualizarProd, AdminController.actualizarProducto);

router.patch("/productos/:id/activar", verificarTokenApi, validarDatosActivarProd, AdminController.activarProducto);

router.patch("/productos/:id/desactivar", verificarTokenApi, validarDatosDesactivarProd, AdminController.desactivarProducto);

export default router;
