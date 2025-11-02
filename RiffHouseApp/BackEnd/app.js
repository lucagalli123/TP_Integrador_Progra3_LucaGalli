import express from "express";
import { sequelize } from "./database/index.js";
import { PUERTO } from "./variablesEntorno.js";
// importacion de modelos
import { Producto, Venta, DetalleVenta, Usuario } from "./models/index.js";
// importacion de rutas

// inicio de express
const app = express();

app.use(express.json());

const iniciarDB = async () => {
    // usuario
    await Usuario.create({
        nombre: "moni",
        email: "moni@example.com",
        password: "1234",
    });

    await Venta.create({
        idCliente: "1",
        fecha: new Date().toLocaleString(),
        total: 15.12,
    });

    // await Usuario.create({
    //     nombre: "carlos",
    //     email: "carlos@example.com",
    //     password: "1111",
    // });

    // await Producto.create({
    //     marca: "Fender",
    //     modelo: "Stratocaster",
    //     imagen: "",
    // });
};

// rutas

// app.use("/api/clientes", clientesRouter);
// app.use("/api/productos", peliculasRouter);
// app.use("/api/usuarios", alquileresRouter);

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
