import express from "express";
import { sequelize } from "./api/database/index.js";
import { PUERTO } from "./variablesEntorno.js";
import { iniciarDB } from "./iniciarDbPrueba.js";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "cors";

// declaro path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// importacion de modelos
import { Producto, Venta, VentaProducto, Usuario } from "./api/models/index.js";

// importacion de rutas
import productosRouter from "./api/routes/productosRouter.js";
import ventasRouter from "./api/routes/ventasRouter.js";
import usuariosRouter from "./api/routes/usuariosRouter.js";
import ticketRoutes from "./api/routes/ticketRouter.js";
import adminRouter from "./api/routes/adminRouter.js";

// ================================= INICIO DE EXPRESS =================================

const app = express();

app.use(cors());
app.use(express.json());

// set de motor de plantilla ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ================================= RUTAS ESTATICAS =================================

// ruta estatica de css/js/img --> para las plantillas ejs
const ruta = path.resolve(__dirname, "public"); // VER TEMA DE QUE LA RUTA ESTE EN .ENV
app.use(express.static(ruta));

// ================================= RUTAS ENDPOINTS API =================================

// ruta api/productos
app.use("/api/productos", productosRouter);

// ruta api/ventas
app.use("/api/ventas", ventasRouter);

// ruta api/usuarios
app.use("/api/usuarios", usuariosRouter);

// ruta al login del admin
app.use("/admin", adminRouter);

// ruta api/ticket
app.use("/ticket", ticketRoutes);

sequelize
    .sync({ force: true })
    .then(() => {
        console.log("Inicializamos la base de datos");
    })
    .then(() => {
        iniciarDB();
        console.log("Cargo la DDBB");
    })
    .then(() => {
        app.listen(PUERTO, () => {
            console.log("El servidor esta corriendo en el puerto " + PUERTO);
        });
    })
    .catch(error => {
        console.log({ error });
    });
