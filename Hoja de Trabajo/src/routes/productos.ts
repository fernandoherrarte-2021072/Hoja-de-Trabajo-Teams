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

    if (
        req.method === "GET" &&
        req.url?.startsWith("/productos/")
    ) {

        const id = Number(
            req.url.split("/")[2]
        );

        const productos =
            await obtenerProductos();

        const producto =
            productos.find(
                (p: any) => p.id === id
            );

        if (!producto) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(
                JSON.stringify({
                    error:
                        "Producto no encontrado"
                })
            );

            return true;

        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(
            JSON.stringify(producto)
        );

        return true;

    }

    return false;

}