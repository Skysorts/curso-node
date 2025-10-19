const express = require("express");
const app = express();
const ditto = require("./pokemon/ditto.json");

const PORT = process.env.PORT ?? 1234;

app.disable("x-powered-by"); // deshabilitar la cabecera que dice que el servidor usa express, innecesario y un riesgo de seguridad

app.use(express.json()); // middleware que parsea el body de los request con content-type application/json
//-----MIDDLEWARE------------------------------------------------------------------------------------
// app.use((req, res, next) => {
// 	if (req.method !== "POST") return next();
// 	if (req.headers["content-type"] !== "application/json") return next();
// 	// solo llegan request POST con header content-type application/json
// 	let body = "";
// 	// escuchar el evento data
// 	req.on("data", (chunk) => {
// 		body += chunk.toString(); // convertir el buffer a string puesto que viene en binario
// 	});
// 	// escuchar el evento end cuando ya no hay más datos que recibir del body del request
// 	req.on("end", () => {
// 		const data = JSON.parse(body); // convertir el string a objeto JSON
// 		data.timestamp = Date.now(); // añadimos la propiedad timestamp al objeto data
// 		req.body = data; // añadimos la propiedad body al objeto req
// 		next();
// 	});
// });

//-----GET---------------------------------------------------------------------------------------------
app.get("/pokemon/ditto", (req, res) => {
	res.json(ditto);
});
//-----POST--------------------------------------------------------------------------------------------
app.post("/pokemon", (req, res) => {
	res.status(201).json(req.body);
});
//-----404---------------------------------------------------------------------------------------------
app.use((req, res) => {
	res.status(404).send("<h1>404</h1>");
});
//-----LISTEN------------------------------------------------------------------------------------------
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
