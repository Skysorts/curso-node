const http = require("node:http"); // protocolo HTTP

//commonJS --> módulos clásicos de node
const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
	const { method, url } = req;

	switch (method) {
		case "GET":
			switch (url) {
				case "/pokemon/ditto":
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					return res.end(JSON.stringify(dittoJSON));
				default:
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					return res.end("<h1>Error 404: Página no encontrada</h1>");
			}

		case "POST":
			switch (url) {
				case "/pokemon": {
					let body = "";

					// escuchar el evento data
					req.on("data", (chunk) => {
						body += chunk.toString(); // convertir el buffer a string puesto que viene en binario
					});

					req.on("end", () => {
						const data = JSON.parse(body);
						//llamar a una base de datos para guardar el pokemon
						res.writeHead(201, {
							"Content-Type": "application/json; charset=utf-8",
						});
						res.end(JSON.stringify(data));
					});

					break;
				}

				default:
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					return res.end("<h1>Error 404: Página no encontrada</h1>");
			}
	}
};
const server = http.createServer(processRequest);

server.listen(1234, () => {
	console.log("server listening on port http://localhost:1234");
});
