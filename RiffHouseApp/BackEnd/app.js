import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./src/database/index.js";
import { PUERTO, URL_FRONT } from "./variablesEntorno.js";
import { iniciarDB } from "./iniciarDbPrueba.js";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "cors";

// declaro path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// importacion de modelos
// import { Producto, Venta, VentaProducto, Usuario } from "./src/models/index.js";

// importacion de rutas
import productosRouter from "./src/api/routes/productosRouter.js";
import ventasRouter from "./src/api/routes/ventasRouter.js";
import ticketRoutes from "./src/api/routes/ticketRouter.js";
import adminRouter from "./src/backoffice/routes/adminRouter.js";
import authRoutes from "./src/backoffice/routes/authRoutes.js";

// ================================= INICIO DE EXPRESS =================================

const app = express();

// ================================= MIDDLEWARES =================================

app.use(cors());
app.use(express.json());

app.use(cookieParser());

// set de motor de plantilla ejs
app.set("views", path.join(__dirname, "src/backoffice/views"));
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

// ruta api/ticket
app.use("/api/ticket", ticketRoutes);

// ================================= RUTA AUTH =================================

app.use("/auth", authRoutes);

// ================================= RUTA ADMIN =================================

app.use("/admin", adminRouter);

// para enviar variable de entorno URL_FRONT al navegador
app.get("/variablesEntorno", (req, res) => {
    res.json({ URL_FRONT });
});

// ================================= INICIO SERVIDOR =================================

sequelize
    .sync({ force: true })
    .then(() => {
        console.log("Inicializamos la base de datos");
        console.log("-------------------------------------------------- ");
    })
    .then(() => {
        iniciarDB();
        console.log("Cargo la DDBB");
        console.log("-------------------------------------------------- ");
    })
    .then(() => {
        app.listen(PUERTO, () => {
            console.log("El servidor esta corriendo en el puerto " + PUERTO);
            console.log("-------------------------------------------------- ");
        });
    })
    .catch(error => {
        console.log({ error });
    });
