import { IncomingMessage, ServerResponse } from "http";
import { obtenerProductos } from "../controllers/productosController";

export async function productosRoute(
    req: IncomingMessage,
    res: ServerResponse
) {

    if (
        req.method === "GET" &&
        req.url === "/productos"
    ) {

        const productos = await obtenerProductos();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(productos));

        return true;
    }

    return false;

}
