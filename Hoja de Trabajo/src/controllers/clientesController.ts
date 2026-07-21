import { readFile, writeFile } from "fs/promises";

const ruta = "./src/data/clientes.json";

export async function obtenerClientes() {

    const datos = await readFile(
        ruta,
        "utf-8"
    );

    return JSON.parse(datos);

}

export async function guardarClientes(
    clientes: any[]
) {

    await writeFile(
        ruta,
        JSON.stringify(
            clientes,
            null,
            4
        )
    );

}