import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { PUERTO, API_URL } from "./variablesEntorno.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get("/api/config", (req, res) => {
    res.json({ API_URL });
});

const ruta = path.resolve(__dirname, "public"); // VER TEMA DE QUE LA RUTA ESTE EN .ENV
app.use("/", express.static(ruta));

app.listen(PUERTO, () => {
    console.log(`Escuchando en puerto ${PUERTO}, http://localhost:${PUERTO}`);
});
