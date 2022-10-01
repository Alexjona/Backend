const express = require('express');
const routerProductos = express.Router()
const Contenedor = require('../controllers/script')

const contenedor = new Contenedor('productos.txt')

const getProducts = async() => {
    listProducts = JSON.stringify(await contenedor.getAll());
    return listProducts;
}

routerProductos.get('/', async(req, res) => {
    res.send(`${await getProducts().catch("Error")}`);
})


routerProductos.get('/:id', async(req, res, next) => {
    let response;
    try {
        let id = parseInt(req.params.id);
        response = await contenedor.getById(id);
        res.send(response)
    } catch (error) {
        if (error.code === "ENOENT") { res.send({ error: "objeto no encontrado" }) } else {
            return next(error)
        }
    }
});

routerProductos.post("/", (req, res, next) => {
    const obj = req.body
    contenedor.save(obj)
        .then(id => { res.send({ id, ...obj }) })
        .catch(error => next(error))
})

routerProductos.put("/:id", (req, res, next) => {
    let response;
    console.log(response)
    const id = parseInt(req.params.id)
    const updateProduct = { id, ...req.body }
    response = contenedor.updateById(updateProduct, id)
        .then(res.send({ message: `El producto con id ${id} se actualizo correctamente` }))
        .catch(res.send({ message: 'El id no existe' }))
})

routerProductos.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    contenedor.deleteById(id)
    res.send({ message: 'Producto eliminado' })
})

module.exports = routerProductos