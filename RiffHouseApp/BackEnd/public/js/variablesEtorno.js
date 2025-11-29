export async function obtenerUrlFront() {
    const respuesta = await fetch("/variablesEntorno");
    const datos = await respuesta.json();
    return datos;
}
