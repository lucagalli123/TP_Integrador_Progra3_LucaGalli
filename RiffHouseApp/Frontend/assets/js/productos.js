import { $ } from "./utils.js";
import { obtenerTemaCargadoLocalStorage, cargarTemaLocalStorage } from "./temas.js";

// ==================== VARIABLES ====================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    // 🎸 GUITARRAS
    { id: 1, nombre: "Fender Stratocaster Player", categoria: "guitarras", precio: 1200, imagen: "assets/img/guitarras/guitarra1.png", activo: true },
    { id: 2, nombre: "Gibson Les Paul Standard", categoria: "guitarras", precio: 1800, imagen: "assets/img/guitarras/guitarra2.png", activo: true },
    { id: 3, nombre: "Ibanez RG450DX", categoria: "guitarras", precio: 950, imagen: "assets/img/guitarras/guitarra3.png", activo: true },
    { id: 4, nombre: "PRS SE Custom 24", categoria: "guitarras", precio: 1400, imagen: "assets/img/guitarras/guitarra4.png", activo: true },
    { id: 5, nombre: "Yamaha Pacifica 112V", categoria: "guitarras", precio: 700, imagen: "assets/img/guitarras/guitarra5.png", activo: true },
    { id: 6, nombre: "ESP LTD EC-256", categoria: "guitarras", precio: 850, imagen: "assets/img/guitarras/guitarra6.png", activo: true },
    { id: 7, nombre: "Schecter Omen Extreme-6", categoria: "guitarras", precio: 950, imagen: "assets/img/guitarras/guitarra7.png", activo: true },
    { id: 8, nombre: "Gretsch G2622 Streamliner", categoria: "guitarras", precio: 1100, imagen: "assets/img/guitarras/guitarra8.png", activo: true },

    // 🎸 BAJOS
    { id: 9, nombre: "Fender Jazz Bass Player", categoria: "bajos", precio: 1300, imagen: "assets/img/bajos/bajo1.png", activo: true },
    { id: 10, nombre: "Music Man StingRay 4", categoria: "bajos", precio: 1600, imagen: "assets/img/bajos/bajo2.png", activo: true },
    { id: 11, nombre: "Yamaha TRBX304", categoria: "bajos", precio: 900, imagen: "assets/img/bajos/bajo3.png", activo: true },
    { id: 12, nombre: "Ibanez SR500E", categoria: "bajos", precio: 1150, imagen: "assets/img/bajos/bajo4.png", activo: true },
    { id: 13, nombre: "Squier Precision Bass", categoria: "bajos", precio: 600, imagen: "assets/img/bajos/bajo5.png", activo: true },
    { id: 14, nombre: "ESP LTD B-204SM", categoria: "bajos", precio: 950, imagen: "assets/img/bajos/bajo6.png", activo: true },
    { id: 15, nombre: "Schecter Stiletto Stealth-4", categoria: "bajos", precio: 980, imagen: "assets/img/bajos/bajo7.png", activo: true },
    { id: 16, nombre: "Warwick RockBass Corvette", categoria: "bajos", precio: 1450, imagen: "assets/img/bajos/bajo8.png", activo: true },
];

let categoriaActual = "guitarras";
let pagActual = 1;
const prodPorPagina = 6;

// ==================== FUNCIONES ====================

// carga productos
function renderProductos(tema) {
    const cont = $("productosContainer");
    cont.innerHTML = "";

    const productosFiltrados = productos.filter(p => p.categoria === categoriaActual);
    const inicio = (pagActual - 1) * prodPorPagina;
    const productosEnPantalla = productosFiltrados.slice(inicio, inicio + prodPorPagina);

    productosEnPantalla.forEach(p => {
        const div = document.createElement("div");
        div.classList.add(`producto-carta-${tema}`);

        const img = document.createElement("img");
        img.src = p.imagen;
        img.alt = p.nombre;

        const h3 = document.createElement("h3");
        h3.textContent = p.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${p.precio}`;

        const btn = document.createElement("button");
        btn.textContent = "Agregar al carrito";
        btn.style.width = "80%";
        btn.addEventListener("click", () => agregarAlCarrito(p.id));

        div.append(img, h3, precio, btn);
        cont.appendChild(div);
    });

    $("pagNum").textContent = pagActual;
    if (tema === "claro") {
        $("pagNum").style.color = "black";
    } else {
        $("pagNum").style.color = "white";
    }
}

// agrega un producto al carrito y guarda en localStorage
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
}

// aplica clase de tema al main
function cargarTemaMain(tema) {
    if (tema === "oscuro") {
        $("main").classList.remove("claro");
        $("main").classList.add("oscuro");
    } else {
        $("main").classList.remove("oscuro");
        $("main").classList.add("claro");
    }
}

// aplica tema y renderiza productos
function aplicarTema(tema) {
    cargarTemaMain(tema);
    renderProductos(tema);
    $("tema").value = tema; // sincroniza select
}

// ==================== EVENTOS ====================

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = obtenerTemaCargadoLocalStorage() || "claro";
    aplicarTema(temaGuardado);
});

$("tema").addEventListener("change", () => {
    const nuevoTema = $("tema").value;
    cargarTemaLocalStorage(nuevoTema);
    aplicarTema(nuevoTema);
});

$("btnGuitarras").addEventListener("click", () => {
    categoriaActual = "guitarras";
    pagActual = 1;
    aplicarTema(obtenerTemaCargadoLocalStorage());
});

$("btnBajos").addEventListener("click", () => {
    categoriaActual = "bajos";
    pagActual = 1;
    aplicarTema(obtenerTemaCargadoLocalStorage());
});

$("pagAnterior").addEventListener("click", () => {
    if (pagActual > 1) pagActual--;
    aplicarTema(obtenerTemaCargadoLocalStorage());
});

$("pagSiguiente").addEventListener("click", () => {
    const maxPag = Math.ceil(productos.filter(p => p.categoria === categoriaActual).length / prodPorPagina);
    if (pagActual < maxPag) pagActual++;
    aplicarTema(obtenerTemaCargadoLocalStorage());
});
