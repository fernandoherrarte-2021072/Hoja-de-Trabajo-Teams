import { IncomingMessage, ServerResponse } from "http";
import { productosRoute } from "./productos";

export async function router(
    req: IncomingMessage,
    res: ServerResponse
) {

    const productos = await productosRoute(
        req,
        res
    );

    if (productos) return;

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            error: "Ruta no encontrada"
        })
    );

}