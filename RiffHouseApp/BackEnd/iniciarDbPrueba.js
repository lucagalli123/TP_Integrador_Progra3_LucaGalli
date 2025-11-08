import { Producto, Venta, VentaProducto, Usuario } from "./api/models/index.js";

export const iniciarDB = async () => {
    console.log("Cargando datos de prueba...");

    // ==== USUARIOS ====
    const usuarios = await Usuario.bulkCreate([
        { nombre: "Moni", email: "moni@example.com", password: "1234" },
        { nombre: "Carlos", email: "carlos@example.com", password: "abcd" },
        { nombre: "Lucia", email: "lucia@example.com", password: "pass123" },
        { nombre: "Juan", email: "jane@example.com", password: "4321" },
    ]);

    // ==== PRODUCTOS ====
    const productos = await Producto.bulkCreate([
        {
            marca: "Fender",
            modelo: "Stratocaster",
            categoria: "guitarras",
            precio: 1200.0,
            activo: true,
            imagen: "guitarra1.png",
        },
        { marca: "Gibson", modelo: "Les Paul", categoria: "guitarras", precio: 1500.0, activo: true, imagen: "guitarra2.png" },
        { marca: "Ibanez", modelo: "RG550", categoria: "guitarras", precio: 1100.0, activo: true, imagen: "guitarra3.png" },
        { marca: "Yamaha", modelo: "Pacifica", categoria: "guitarras", precio: 800.0, activo: true, imagen: "guitarra4.png" },

        { marca: "Fender", modelo: "Jazz Bass", categoria: "bajos", precio: 1300.0, activo: true, imagen: "bajo1.png" },
        { marca: "Gibson", modelo: "Thunderbird", categoria: "bajos", precio: 1400.0, activo: true, imagen: "bajo2.png" },
        { marca: "Ibanez", modelo: "SR300E", categoria: "bajos", precio: 950.0, activo: true, imagen: "bajo3.png" },
        { marca: "Yamaha", modelo: "TRBX174", categoria: "bajos", precio: 700.0, activo: true, imagen: "bajo4.png" },

        { marca: "Epiphone", modelo: "SG Standard", categoria: "guitarras", precio: 900.0, activo: true, imagen: "guitarra5.png" },
        { marca: "Schecter", modelo: "Omen Extreme-6", categoria: "guitarras", precio: 850.0, activo: true, imagen: "guitarra6.png" },
        { marca: "Jackson", modelo: "Soloist SLX", categoria: "guitarras", precio: 1150.0, activo: true, imagen: "guitarra7.png" },
        { marca: "PRS", modelo: "SE Custom 24", categoria: "guitarras", precio: 1250.0, activo: true, imagen: "guitarra8.png" },
        { marca: "Squier", modelo: "Precision Bass", categoria: "bajos", precio: 650.0, activo: true, imagen: "bajo5.png" },
        { marca: "Music Man", modelo: "StingRay", categoria: "bajos", precio: 1600.0, activo: true, imagen: "bajo6.png" },
        { marca: "Cort", modelo: "Action PJ", categoria: "bajos", precio: 500.0, activo: true, imagen: "bajo7.png" },
        { marca: "ESP", modelo: "LTD B-204", categoria: "bajos", precio: 1050.0, activo: true, imagen: "bajo8.png" },
    ]);

    // ==== VENTAS ====
    // const ventas = await Venta.bulkCreate([
    //     { cliente: "Moni", fecha: new Date().toLocaleString(), total: 2000.0 },
    //     { cliente: "Carlos", fecha: new Date().toLocaleString(), total: 1500.0 },
    //     { cliente: "Lucia", fecha: new Date().toLocaleString(), total: 800.0 },
    //     { cliente: "Juan", fecha: new Date().toLocaleString(), total: 1300.0 },
    // ]);

    // ==== DETALLES DE VENTAS ====
    // await VentaProducto.bulkCreate([
    //     {
    //         idVenta: ventas[0].id,
    //         idProducto: productos[0].id, // Stratocaster
    //         cantidad: 1,
    //         precioUnitario: 1200.0,
    //     },
    //     {
    //         idVenta: ventas[0].id,
    //         idProducto: productos[4].id, // Jazz Bass
    //         cantidad: 1,
    //         precioUnitario: 800.0,
    //     },
    //     {
    //         idVenta: ventas[1].id,
    //         idProducto: productos[1].id, // Les Paul
    //         cantidad: 1,
    //         precioUnitario: 1500.0,
    //     },
    //     {
    //         idVenta: ventas[2].id,
    //         idProducto: productos[3].id, // Pacifica
    //         cantidad: 1,
    //         precioUnitario: 800.0,
    //     },
    //     {
    //         idVenta: ventas[3].id,
    //         idProducto: productos[6].id, // Ibanez SR300E
    //         cantidad: 1,
    //         precioUnitario: 950.0,
    //     },
    // ]);

    console.log("Datos de prueba cargados correctamente 🎸✅");
};
