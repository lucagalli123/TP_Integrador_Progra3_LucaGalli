export async function obtenerConfig() {
    const respuesta = await fetch("/api/config");
    const datos = await respuesta.json();
    return datos;
}
