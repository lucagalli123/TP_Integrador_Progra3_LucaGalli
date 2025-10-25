import { $ } from "./utils.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    // 🎸 GUITARRAS
    {
        id: 1,
        nombre: "Fender Stratocaster Player",
        categoria: "guitarras",
        precio: 1200,
        imagen: "assets/img/guitarras/guitarra1.png",
        activo: true,
    },
    {
        id: 2,
        nombre: "Gibson Les Paul Standard",
        categoria: "guitarras",
        precio: 1800,
        imagen: "assets/img/guitarras/guitarra2.png",
        activo: true,
    },
    {
        id: 3,
        nombre: "Ibanez RG450DX",
        categoria: "guitarras",
        precio: 950,
        imagen: "assets/img/guitarras/guitarra3.png",
        activo: true,
    },
    {
        id: 4,
        nombre: "PRS SE Custom 24",
        categoria: "guitarras",
        precio: 1400,
        imagen: "assets/img/guitarras/guitarra4.png",
        activo: true,
    },
    {
        id: 5,
        nombre: "Yamaha Pacifica 112V",
        categoria: "guitarras",
        precio: 700,
        imagen: "assets/img/guitarras/guitarra5.png",
        activo: true,
    },
    {
        id: 6,
        nombre: "ESP LTD EC-256",
        categoria: "guitarras",
        precio: 850,
        imagen: "assets/img/guitarras/guitarra6.png",
        activo: true,
    },
    {
        id: 7,
        nombre: "Schecter Omen Extreme-6",
        categoria: "guitarras",
        precio: 950,
        imagen: "assets/img/guitarras/guitarra7.png",
        activo: true,
    },
    {
        id: 8,
        nombre: "Gretsch G2622 Streamliner",
        categoria: "guitarras",
        marca: "Gretsch",
        modelo: "G2622",
        precio: 1100,
        imagen: "assets/img/guitarras/guitarra8.png",
        activo: true,
    },

    // 🎸 BAJOS
    {
        id: 9,
        nombre: "Fender Jazz Bass Player",
        categoria: "bajos",
        precio: 1300,
        imagen: "assets/img/bajos/bajo1.png",
        activo: true,
    },
    {
        id: 10,
        nombre: "Music Man StingRay 4",
        categoria: "bajos",
        precio: 1600,
        imagen: "assets/img/bajos/bajo2.png",
        activo: true,
    },
    {
        id: 11,
        nombre: "Yamaha TRBX304",
        categoria: "bajos",
        precio: 900,
        imagen: "assets/img/bajos/bajo3.png",
        activo: true,
    },
    {
        id: 12,
        nombre: "Ibanez SR500E",
        categoria: "bajos",
        precio: 1150,
        imagen: "assets/img/bajos/bajo4.png",
        activo: true,
    },
    {
        id: 13,
        nombre: "Squier Precision Bass",
        categoria: "bajos",
        precio: 600,
        imagen: "assets/img/bajos/bajo5.png",
        activo: true,
    },
    {
        id: 14,
        nombre: "ESP LTD B-204SM",
        categoria: "bajos",
        precio: 950,
        imagen: "assets/img/bajos/bajo6.png",
        activo: true,
    },
    {
        id: 15,
        nombre: "Schecter Stiletto Stealth-4",
        categoria: "bajos",
        precio: 980,
        imagen: "assets/img/bajos/bajo7.png",
        activo: true,
    },
    {
        id: 16,
        nombre: "Warwick RockBass Corvette",
        categoria: "bajos",
        precio: 1450,
        imagen: "assets/img/bajos/bajo8.png",
        activo: true,
    },
];

let categoriaActual = "guitarras";
let pagActual = 1;
const prodPorPagina = 6;

function renderProductos() {
    const cont = $("productosContainer");
    cont.innerHTML = "";
    const productosdFiltrados = productos.filter(p => p.categoria === categoriaActual);
    const inicio = (pagActual - 1) * prodPorPagina;
    const productosEnPantalla = productosdFiltrados.slice(inicio, inicio + prodPorPagina);

    productosEnPantalla.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("producto-carta");

        // imagen
        const img = document.createElement("img");
        img.src = p.imagen;
        img.alt = p.nombre;

        // nombre
        const h3 = document.createElement("h3");
        h3.textContent = p.nombre;

        // precio
        const precio = document.createElement("p");
        precio.textContent = `$${p.precio}`;

        // boton agrega al carrito
        const btn = document.createElement("button");
        btn.textContent = "Agregar al carrito";
        btn.style.width = "80%";
        btn.addEventListener("click", () => agregarAlCarrito(p.id));

        // agregar todo al div
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(precio);
        div.appendChild(btn);

        // agregar div al contenedor
        cont.appendChild(div);
    });

    $("pagNum").textContent = pagActual;
}

function agregarAlCarrito(idProducto) {
    // busco el producto
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    // me fijo si esta en el carrito
    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        // si esta, sumo 1 mas
        carrito[index].cantidad++;
    } else {
        // sino esta, agregar 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    // guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // confirmacion
    alert(`${producto.nombre} agregado al carrito`);
}

// LISTENERS ===============================================================

$("btnGuitarras").addEventListener("click", () => {
    categoriaActual = "guitarras";
    pagActual = 1;
    renderProductos();
});
$("btnBajos").addEventListener("click", () => {
    categoriaActual = "bajos";
    pagActual = 1;
    renderProductos();
});
$("pagAnterior").addEventListener("click", () => {
    if (pagActual > 1) {
        pagActual--;
        renderProductos();
    }
});
$("pagSiguiente").addEventListener("click", () => {
    if (pagActual < Math.ceil(productos.filter(p => p.categoria === categoriaActual).length / prodPorPagina)) {
        pagActual++;
        renderProductos();
    }
});

renderProductos();
