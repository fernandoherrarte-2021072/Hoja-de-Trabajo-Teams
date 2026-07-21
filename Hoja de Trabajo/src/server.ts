import http from "http";

const servidor = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            mensaje: "Servidor funcionando correctamente"
        })
    );

});

servidor.listen(3000, () => {

    console.log("Servidor ejecutándose en http://localhost:3000");

});