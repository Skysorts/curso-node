const http = require("node:http"); // protocolo HTTP
const fs = require("node:fs"); // file system

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
	//callback (cada vez que recive un request se ejecuta la funcion {})
	res.setHeader("Content-Type", "text/html; charset=utf-8");

	if (req.url === "/") {
		res.statusCode = 200; // OK, podría quitarse porque es el valor por defecto
		res.end("<h1>Bienvenido a mi página de inicio</h1>");
	} else if (req.url === "/imagen") {
		res.statusCode = 200; // OK
		fs.readFile("./imagen.png", (err, data) => {
			if (err) {
				res.statusCode = 500; // Internal Server Error
				res.end("<h1>Error 500: interno del servidor</h1>");
			} else {
				res.setHeader("Content-Type", "image/png");
				res.end(data);
			}
		});
	} else if (req.url === "/contacto") {
		res.statusCode = 200; // OK
		res.end("<h1>Contacto</h1>");
	} else {
		res.statusCode = 404; // Not Found
		res.end("<h1>Error 404: Página no encontrada</h1>");
	}
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
	console.log(`server listening on port http://localhost:${desiredPort}`);
});
