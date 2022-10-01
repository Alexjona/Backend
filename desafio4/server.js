const express = require("express");
const routerProductos = require('./routes/productos')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.use("/api/productos", routerProductos);

//Running server
const PORT = 3009;
const server = app.listen(PORT, () =>  {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
});

server.on("error", error => console.log(`Error: ${error}`))