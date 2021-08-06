const helmet = require("helmet"); //seguridad
const express = require("express");
const { json } = require("body-parser"); //devolver y tratar peticiones como json

//import userRouter desde routes
const { userRouter, movieRouter, personRouter } = require("./routes");

const app = express();

app.use(helmet());
app.use(json());

//usar userRouter para manejar las peticiones desde /user
app.use("/account", userRouter);
app.use("/movies", movieRouter);
app.use("/persons", personRouter);

//rutas disponibles para los usuarios
app.get("/", (req, res) => {
  //Response ok con mensaje
  res.status(200).send({
    message: "Server.js Hello world",
  });
});

module.exports = app;
