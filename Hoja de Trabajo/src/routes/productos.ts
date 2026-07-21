import { IncomingMessage, ServerResponse } from "http";
import {
    obtenerProductos,
    guardarProductos
} from "../controllers/productosController";

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

    if (
        req.method === "POST" &&
        req.url === "/productos"
    ) {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            const nuevoProducto =
                JSON.parse(body);

            const productos =
                await obtenerProductos();

            productos.push(
                nuevoProducto
            );

            await guardarProductos(
                productos
            );

            res.writeHead(201, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    mensaje:
                        "Producto agregado"
                })
            );

        });

        return true;

    }

    if (
        req.method === "PUT" &&
        req.url?.startsWith("/productos/")
    ) {

        const id = Number(
            req.url.split("/")[2]
        );

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            const productoActualizado =
                JSON.parse(body);

            const productos =
                await obtenerProductos();

            const indice =
                productos.findIndex(
                    (p: any) => p.id === id
                );

            if (indice === -1) {

                res.writeHead(404, {
                    "Content-Type":
                        "application/json"
                });

                res.end(
                    JSON.stringify({
                        error:
                            "Producto no encontrado"
                    })
                );

                return;
            }

            productos[indice] =
                productoActualizado;

            await guardarProductos(
                productos
            );

            res.writeHead(200, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    mensaje:
                        "Producto actualizado"
                })
            );

        });

        return true;

    }

    return false;

}