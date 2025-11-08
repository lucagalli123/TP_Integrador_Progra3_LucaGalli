import { $ } from "./utils.js";
import { obtenerConfig } from "./variablesEntorno.js";
import { getTema, setTema, cambiarTemaMain } from "./temas.js";

// ==================== VARIABLES ====================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosDataGlobal = {};
let API_URL = "";
let categoriaActual = "guitarras";
let pagActual = 1;
const prodPorPagina = 6;

// ==================== FUNCIONES ====================

// renderiza los productos de la pag
async function renderProductos(tema) {
    const cont = $("productosContainer");
    cont.innerHTML = "";

    // traer productos desde el backend

    try {
        const respuestaAPI = await fetch(`${API_URL}/api/productos?tipo=cliente&categoria=${categoriaActual}&pag=${pagActual}&limit=${prodPorPagina}`); // VER TEMA DE PUERTO EN .ENV

        const productosData = await respuestaAPI.json();
        const listaProductos = productosData.listaProd;

        // le mando los productos a la variable global para guardar productos en el carrito
        productosDataGlobal = productosData;

        listaProductos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add(`producto-carta-${tema}`);

            const img = document.createElement("img");
            img.src = `${API_URL}/public/img/${categoriaActual}/${p.imagen}`; // VER TEMA DE PUERTO EN .ENV
            img.alt = `${p.marca} ${p.modelo}`;

            const h3 = document.createElement("h3");
            h3.textContent = `${p.marca} ${p.modelo}`;

            const precio = document.createElement("p");
            precio.textContent = `$${p.precio}`;

            const btn = document.createElement("button");
            btn.textContent = "Agregar al carrito";
            btn.style.width = "80%";
            btn.addEventListener("click", () => agregarAlCarrito(p.id));

            div.append(img, h3, precio, btn);
            cont.appendChild(div);
        });

        // actualizar numero de pagina
        $("pagNum").textContent = pagActual;
        tema === "claro" ? ($("pagNum").style.color = "black") : ($("pagNum").style.color = "white");
    } catch (error) {
        console.error(error);

        const textError = document.createElement("p");
        textError.textContent = "Error al cargar los productos. Intente mas tarde";
        textError.style.textAlign = "center";

        cont.appendChild(textError);
    }
}

// agrega un producto al carrito y guarda en localStorage
function agregarAlCarrito(idProducto) {
    const producto = productosDataGlobal.listaProd.find(p => p.id === idProducto);
    if (!producto) return;

    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.marca} ${producto.modelo} agregado al carrito`);
}

// ==================== EVENTOS ====================

document.addEventListener("DOMContentLoaded", async () => {
    const config = await obtenerConfig();
    API_URL = config.API_URL;
    const temaGuardado = getTema() || "claro";
    cambiarTemaMain(temaGuardado);
    await renderProductos(temaGuardado);

    // listener de cambio de tema
    const temaSelect = $("tema");
    if (temaSelect) {
        temaSelect.value = temaGuardado;
        temaSelect.addEventListener("change", async () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            cambiarTemaMain(nuevoTema);
            await renderProductos(nuevoTema);
        });
    }

    // botones categorias
    $("btnGuitarras").addEventListener("click", async () => {
        categoriaActual = "guitarras";
        pagActual = 1;
        await renderProductos(getTema());
    });

    $("btnBajos").addEventListener("click", async () => {
        categoriaActual = "bajos";
        pagActual = 1;
        await renderProductos(getTema());
    });

    // botones paginacion
    $("pagAnterior").addEventListener("click", async () => {
        if (pagActual > 1) pagActual--;
        await renderProductos(getTema());
    });

    $("pagSiguiente").addEventListener("click", async () => {
        const maxPag = productosDataGlobal.paginas;
        if (pagActual < maxPag) pagActual++;
        await renderProductos(getTema());
    });
});
