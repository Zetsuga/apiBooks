const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las rutas
let usuarioRoute = require("./Router/usuarios.routes");
let libroRoute = require("./Router/libros.routes");

//Configuración de la API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("port", process.env.PORT || 3000);

//RUTAS
app.use(usuarioRoute);
app.use(libroRoute);

module.exports = app;