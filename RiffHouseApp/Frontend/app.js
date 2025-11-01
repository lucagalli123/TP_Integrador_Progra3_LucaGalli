import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

const ruta = path.resolve(__dirname, "./public");
app.use(express.static(ruta));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}, http://localhost:3000`);
});
