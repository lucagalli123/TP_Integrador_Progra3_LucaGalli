import { $, getTema, setTema, cambiarTemaMain, cambiarTemaTitulo, cambiarTemaHeader, cambiarTemaFooter } from "./utils.js";
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
            cont.style.display = "flex";
            cont.appendChild(textError);
            $("main").style.justifyContent = "space-between";
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
            img.classList.add("producto");
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

            // icono basura (eliminar del carrito)
            const iconoBasura = document.createElement("img");
            iconoBasura.classList.add("icono-basura");
            iconoBasura.setAttribute("src", "/img/logo/eliminar-del-carrito.png");
            // iconoBasura.textContent = "🗑️❌";

            // color y texto del boton segun si el producto esta en el carrito o no
            const enCarrito = carrito.some(item => item.id === p.id);
            if (enCarrito) {
                iconoBasura.style.display = "block";
                btn.textContent = "Agregado al carrito";

                //
                btn.classList.remove("btn-normal");
                btn.classList.add("btn-agregado");
            } else {
                iconoBasura.style.display = "none";
                btn.textContent = "🛒 Agregar al carrito";

                //
                btn.classList.remove("btn-agregado");
                btn.classList.add("btn-normal");
            }

            // listener del boton agregar/eliminar del carrito
            btn.addEventListener("click", () => {
                const index = carrito.findIndex(item => item.id === p.id);

                if (index === -1) {
                    // agregar al carrito
                    carrito.push({ ...p, cantidad: 1 });
                    iconoBasura.style.display = "block";
                    btn.textContent = "Agregado al carrito";
                    btn.classList.remove("btn-normal");
                    btn.classList.add("btn-agregado");
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
            });

            iconoBasura.addEventListener("click", () => {
                const index = carrito.findIndex(item => item.id === p.id);
                // eliminar del carrito
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                iconoBasura.style.display = "none";
                btn.textContent = "🛒 Agregar al carrito";
                btn.classList.remove("btn-agregado");
                btn.classList.add("btn-normal");
            });

            div.append(img, marcaModelo, precio, btn, iconoBasura);
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
    cambiarTemaHeader(temaGuardado);
    cambiarTemaFooter(temaGuardado);
    await renderProductos(temaGuardado);

    // listener de cambio de tema
    const temaSelect = $("temaSelect");
    if (temaSelect) {
        temaSelect.value = temaGuardado;
        temaSelect.addEventListener("change", async () => {
            const nuevoTema = temaSelect.value;
            setTema(nuevoTema);
            cambiarTemaMain(nuevoTema);
            cambiarTemaHeader(nuevoTema);
            cambiarTemaFooter(nuevoTema);
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
