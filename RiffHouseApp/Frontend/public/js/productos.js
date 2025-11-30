import { $, getTema, setTema, cambiarTemaMain, cambiarTemaTitulo } from "./utils.js";
import { obtenerApiUrl } from "./variablesEntorno.js";

// =============================== VARIABLES ===============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//
let productosDataGlobal = [];
//
let categoriaActual = "guitarras";
let pagActual = 1;
const prodPorPagina = 6;

// =============================== FUNCIONES ===============================

// renderiza los productos de la pag
async function renderProductos(tema) {
    const cont = $("productosContainer");
    cont.innerHTML = "";

    try {
        // peticion a la api
        const apiResponse = await fetch(`${API_URL}/api/productos?tipo=paginados&categoria=${categoriaActual}&pag=${pagActual}&limit=${prodPorPagina}`);
        const result = await apiResponse.json();

        if (!apiResponse.ok) {
            const textError = document.createElement("p");
            textError.textContent = `${result.message}. (Error ${apiResponse.status})` || "error inesperado";
            textError.style.textAlign = "center";
            cont.appendChild(textError);
            return;
        }

        if (result.message === "No hay productos activos") {
            const textError = document.createElement("p");
            tema === "claro" ? (textError.style.color = "black") : (textError.style.color = "white");
            textError.style.textAlign = "center";
            textError.textContent = "No hay productos disponibles. Intente mas tarde";
            cont.appendChild(textError);
            return;
        }

        const listaProductos = result.data.listaProductos;

        // le mando los productos a la variable global para guardar productos en el carrito
        productosDataGlobal = result.data;

        listaProductos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add(`producto-carta-${tema}`);

            // imagen producto
            const img = document.createElement("img");
            img.src = p.imagen; // VER TEMA DE PUERTO EN .ENV !!!!!
            img.alt = `${p.marca} ${p.modelo}`;

            // nombre producto
            const marca = document.createElement("h3");
            const modelo = document.createElement("h3");
            const marcaModelo = document.createElement("div");
            marcaModelo.classList.add("div-marca-modelo");
            //
            marca.textContent = `${p.marca},`;
            modelo.textContent = p.modelo;
            //
            marcaModelo.appendChild(marca);
            marcaModelo.appendChild(modelo);

            // precio producto
            const precio = document.createElement("p");
            precio.textContent = `$${p.precio}`;

            // boton agregar/eliminar del carrito
            const btn = document.createElement("button");
            btn.style.width = "80%";

            // color y texto del boton segun si el producto esta en el carrito o no
            const enCarrito = carrito.some(item => item.id === p.id);
            if (enCarrito) {
                btn.textContent = "Eliminar del carrito";
                btn.style.backgroundColor = "grey";
            } else {
                btn.textContent = "🛒 Agregar al carrito";
                btn.style.backgroundColor = "#fd7b25";
            }

            // listener del boton agregar/eliminar del carrito
            btn.addEventListener("click", () => {
                const index = carrito.findIndex(item => item.id === p.id);

                if (index === -1) {
                    // agregar al carrito
                    carrito.push({ ...p, cantidad: 1 });
                    btn.textContent = "Eliminar del carrito";
                    btn.style.backgroundColor = "grey";
                    btn.style.color = "white";
                } else {
                    // eliminar del carrito
                    carrito.splice(index, 1);
                    btn.textContent = "🛒 Agregar al carrito";
                    btn.style.backgroundColor = "#fd7b25";
                    btn.style.color = "white";
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
            });

            div.append(img, marcaModelo, precio, btn);
            cont.appendChild(div);
        });

        // actualizar numero de pagina
        $("pagNum").textContent = pagActual;
        tema === "claro" ? ($("pagNum").style.color = "black") : ($("pagNum").style.color = "white");
    } catch (error) {
        console.error("Error en fetch:", error);

        const textError = document.createElement("p");
        textError.textContent = "Error de conexion. Intente nuevamente.";
        textError.style.textAlign = "center";
        cont.appendChild(textError);
    }
}

// =============================== EVENTOS ===============================

let API_URL = "";
document.addEventListener("DOMContentLoaded", async () => {
    // obtengo la url de la api
    const response = await obtenerApiUrl();
    API_URL = response.API_URL;

    const temaGuardado = getTema() || "claro";
    cambiarTemaMain(temaGuardado);
    await renderProductos(temaGuardado);

    // listener de cambio de tema
    const temaSelect = $("temaSelect");
    if (temaSelect) {
        temaSelect.value = temaGuardado;
        temaSelect.addEventListener("change", async () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            cambiarTemaMain(nuevoTema);
            await renderProductos(nuevoTema);
        });
    }
});

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
    if (pagActual > 1) {
        pagActual--;
        await renderProductos(getTema());
    }
});

$("pagSiguiente").addEventListener("click", async () => {
    const maxPag = productosDataGlobal.totalPaginas;
    if (pagActual < maxPag) {
        pagActual++;
        await renderProductos(getTema());
    }
});
