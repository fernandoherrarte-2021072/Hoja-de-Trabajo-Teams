import { IncomingMessage, ServerResponse } from "http";
import {
    obtenerClientes,
    guardarClientes
} from "../controllers/clientesController";

export async function clientesRoute(
    req: IncomingMessage,
    res: ServerResponse
) {

    // GET TODOS
    if (
        req.method === "GET" &&
        req.url === "/clientes"
    ) {

        const clientes =
            await obtenerClientes();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(
            JSON.stringify(clientes)
        );

        return true;

    }

    // GET POR ID
    if (
        req.method === "GET" &&
        req.url?.startsWith("/clientes/")
    ) {

        const id = Number(
            req.url.split("/")[2]
        );

        const clientes =
            await obtenerClientes();

        const cliente =
            clientes.find(
                (c: any) => c.id === id
            );

        if (!cliente) {

            res.writeHead(404, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    error:
                        "Cliente no encontrado"
                })
            );

            return true;

        }

        res.writeHead(200, {
            "Content-Type":
                "application/json"
        });

        res.end(
            JSON.stringify(cliente)
        );

        return true;

    }

    // POST
    if (
        req.method === "POST" &&
        req.url === "/clientes"
    ) {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            const nuevoCliente =
                JSON.parse(body);

            const clientes =
                await obtenerClientes();

            clientes.push(
                nuevoCliente
            );

            await guardarClientes(
                clientes
            );

            res.writeHead(201, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    mensaje:
                        "Cliente agregado"
                })
            );

        });

        return true;

    }

    // PUT
    if (
        req.method === "PUT" &&
        req.url?.startsWith("/clientes/")
    ) {

        const id = Number(
            req.url.split("/")[2]
        );

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            const clienteActualizado =
                JSON.parse(body);

            const clientes =
                await obtenerClientes();

            const indice =
                clientes.findIndex(
                    (c: any) => c.id === id
                );

            if (indice === -1) {

                res.writeHead(404, {
                    "Content-Type":
                        "application/json"
                });

                res.end(
                    JSON.stringify({
                        error:
                            "Cliente no encontrado"
                    })
                );

                return;

            }

            clientes[indice] =
                clienteActualizado;

            await guardarClientes(
                clientes
            );

            res.writeHead(200, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    mensaje:
                        "Cliente actualizado"
                })
            );

        });

        return true;

    }

    // DELETE
    if (
        req.method === "DELETE" &&
        req.url?.startsWith("/clientes/")
    ) {

        const id = Number(
            req.url.split("/")[2]
        );

        const clientes =
            await obtenerClientes();

        const nuevos =
            clientes.filter(
                (c: any) => c.id !== id
            );

        if (
            clientes.length ===
            nuevos.length
        ) {

            res.writeHead(404, {
                "Content-Type":
                    "application/json"
            });

            res.end(
                JSON.stringify({
                    error:
                        "Cliente no encontrado"
                })
            );

            return true;

        }

        await guardarClientes(
            nuevos
        );

        res.writeHead(200, {
            "Content-Type":
                "application/json"
        });

        res.end(
            JSON.stringify({
                mensaje:
                    "Cliente eliminado"
            })
        );

        return true;

    }

    return false;

}