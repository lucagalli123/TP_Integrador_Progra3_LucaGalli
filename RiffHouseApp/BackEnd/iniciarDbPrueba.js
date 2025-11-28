import { Producto, Usuario } from "./src/models/index.js";
import bcrypt from "bcrypt";

export const iniciarDB = async () => {
    console.log("Cargando datos de prueba...");

    // ===================== CREAR USUARIOS =====================
    const listaUsuarios = [
        { nombre: "Moni", email: "moni@example.com", password: "12345678" },
        { nombre: "Carlos", email: "carlos@example.com", password: "abcdefgh" },
    ];

    listaUsuarios.forEach(u => {
        const { nombre, email, password } = u;
        fetch("http://localhost:3001/admin/usuarios", {
            method: "POST",
            body: JSON.stringify({ nombre, email, password }),
            headers: { "Content-Type": "application/json" },
        });
    });

    // ===================== CREAR PRODUCTOS =====================

    // DESPUES VER SI LOS CARGO CON FETCH O ASI HARDCODEADO SIN VALIDACIONES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const productos = await Producto.bulkCreate([
        {
            marca: "Fender",
            modelo: "Stratocaster",
            categoria: "Guitarras",
            precio: 1200.0,
            activo: true,
            imagen: "http://localhost:3001/uploads/guitarras/guitarra1.png",
        },
        { marca: "Gibson", modelo: "Les Paul", categoria: "Guitarras", precio: 1500.0, activo: true, imagen: "http://localhost:3001/uploads/guitarras/guitarra2.png" },
        { marca: "Ibanez", modelo: "RG550", categoria: "Guitarras", precio: 1100.0, activo: false, imagen: "http://localhost:3001/uploads/guitarras/guitarra3.png" },
        { marca: "Yamaha", modelo: "Pacifica", categoria: "Guitarras", precio: 800.0, activo: false, imagen: "http://localhost:3001/uploads/guitarras/guitarra4.png" },

        { marca: "Fender", modelo: "Jazz Bass", categoria: "Bajos", precio: 1300.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo1.png" },
        { marca: "Gibson", modelo: "Thunderbird", categoria: "Bajos", precio: 1400.0, activo: true, imagen: "http://localhost:3001/uploads/bajos/bajo2.png" },
        { marca: "Ibanez", modelo: "SR300E", categoria: "Bajos", precio: 950.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo3.png" },
        { marca: "Yamaha", modelo: "TRBX174", categoria: "Bajos", precio: 700.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo4.png" },

        { marca: "Epiphone", modelo: "SG Standard", categoria: "Guitarras", precio: 900.0, activo: false, imagen: "http://localhost:3001/uploads/guitarras/guitarra5.png" },
        { marca: "Schecter", modelo: "Omen Extreme-6", categoria: "Guitarras", precio: 850.0, activo: true, imagen: "http://localhost:3001/uploads/guitarras/guitarra6.png" },
        { marca: "Jackson", modelo: "Soloist SLX", categoria: "Guitarras", precio: 1150.0, activo: false, imagen: "http://localhost:3001/uploads/guitarras/guitarra7.png" },
        { marca: "PRS", modelo: "SE Custom 24", categoria: "Guitarras", precio: 1250.0, activo: true, imagen: "http://localhost:3001/uploads/guitarras/guitarra8.png" },
        { marca: "Squier", modelo: "Precision Bass", categoria: "Bajos", precio: 650.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo5.png" },
        { marca: "Music Man", modelo: "StingRay", categoria: "Bajos", precio: 1600.0, activo: true, imagen: "http://localhost:3001/uploads/bajos/bajo6.png" },
        { marca: "Cort", modelo: "Action PJ", categoria: "Bajos", precio: 500.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo7.png" },
        { marca: "ESP", modelo: "LTD B-204", categoria: "Bajos", precio: 1050.0, activo: false, imagen: "http://localhost:3001/uploads/bajos/bajo8.png" },
    ]);

    console.log("Datos de prueba cargados ✅");
};
