import { Producto, Usuario } from "./src/models/index.js";
import { URL } from "../FrontEnd/variablesEntorno.js";
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
        fetch(`${URL}/admin/usuarios`, {
            method: "POST",
            body: JSON.stringify({ nombre, email, password }),
            headers: { "Content-Type": "application/json" },
        });
    });

    // ===================== CREAR PRODUCTOS =====================

    // DESPUES VER SI LOS CARGO CON FETCH O ASI HARDCODEADO SIN VALIDACIONES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const productos = await Producto.bulkCreate([
        { marca: "Dean", modelo: "RazorBack", categoria: "Guitarras", precio: 1200.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Dean-RazorBack.avif` },
        { marca: "Dean", modelo: "Usa Flat", categoria: "Guitarras", precio: 1500.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Dean-UsaFlat.avif` },
        { marca: "Fender", modelo: "Classic Jaguar", categoria: "Guitarras", precio: 1100.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Fender-ClassicJaguar.avif` }, // RiffHouseApp\BackEnd\public\uploads\guitarras\Guitar-Fender-ClassicJaguar.avif
        {
            marca: "Fender",
            modelo: "Classic Stratocaster",
            categoria: "Guitarras",
            precio: 800.0,
            activo: true,
            imagen: `${URL}/uploads/guitarras/Guitar-Fender-ClassicStratocaster.avif`,
        },
        { marca: "Schecter", modelo: "Black Jack", categoria: "Guitarras", precio: 1250.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Schecter-BlackJack.avif` },
        { marca: "Schecter", modelo: "Usa Custom", categoria: "Guitarras", precio: 900.0, activo: false, imagen: `${URL}/uploads/guitarras/Guitar-Schecter-UsaCustom.avif` },
        {
            marca: "Jackson",
            modelo: "American Soloist",
            categoria: "Guitarras",
            precio: 1150.0,
            activo: true,
            imagen: `${URL}/uploads/guitarras/Guitar-Jackson-AmericanSoloist.avif`,
        },
        { marca: "Jackson", modelo: "Kelly KEX", categoria: "Guitarras", precio: 900.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Jackson-KellyKEX.avif` },
        { marca: "Jackson", modelo: "Rhoads JS32T", categoria: "Guitarras", precio: 900.0, activo: true, imagen: `${URL}/uploads/guitarras/Guitar-Jackson-RhoadsJS32T.avif` },

        //
        { marca: "Dean", modelo: "Custom Zone", categoria: "Bajos", precio: 1300.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Dean-CustomZone.avif` },
        { marca: "Dean", modelo: "Spider Redwood", categoria: "Bajos", precio: 850.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Dean-SpiderRedwood.avif` },
        { marca: "Fender", modelo: "50's Precision Bass", categoria: "Bajos", precio: 950.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Fender-50sPrecissionBass.avif` },
        { marca: "Fender", modelo: "Jazz Bass", categoria: "Bajos", precio: 1400.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Fender-JazzBass.avif` },
        { marca: "Schecter", modelo: "Omen Extreme", categoria: "Bajos", precio: 700.0, activo: false, imagen: `${URL}/uploads/bajos/Bass-Schecter-OmenExtreme.avif` },
        { marca: "Ibanez", modelo: "AFB", categoria: "Bajos", precio: 650.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Ibanez-AFB.png` },
        { marca: "Ibanez", modelo: "Work Shop", categoria: "Bajos", precio: 1600.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Ibanez-WorkShop.png` },
        { marca: "Jackson", modelo: "Concert JS32", categoria: "Bajos", precio: 500.0, activo: false, imagen: `${URL}/uploads/bajos/Bass-Jackson-ConcertJS32.avif` },
        { marca: "Jackson", modelo: "David Ellefson", categoria: "Bajos", precio: 1050.0, activo: true, imagen: `${URL}/uploads/bajos/Bass-Jackson-DavidEllefson.avif` },
    ]);

    console.log("Datos de prueba cargados ✅");
    console.log("======================================================================");
};
