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

// ================================= INICIO DE EXPRESS =================================

const app = express();

app.use(cors());
app.use(express.json());

// ================================= RUTAS =================================

// ruta estatica /public
const ruta = path.resolve(__dirname, "public"); // VER TEMA DE QUE LA RUTA ESTE EN .ENV
app.use("/public", express.static(ruta));

// ruta api/productos
app.use("/api/productos", productosRouter);

// ruta api/ventas
app.use("/api/ventas", ventasRouter);

// ruta api/usuarios
app.use("/api/usuarios", usuariosRouter);

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
