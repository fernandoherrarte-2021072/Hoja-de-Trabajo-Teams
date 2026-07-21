import { readFile, writeFile } from "fs/promises";

const ruta = "./src/data/productos.json";

export async function obtenerProductos() {

    const datos = await readFile(ruta, "utf-8");

    return JSON.parse(datos);

}