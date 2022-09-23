const express = require('express')
const app = express()

const fs = require('fs')
const random = require('random')

class Cont {
    constructor(file) {
        this.file = file
    }

    async getAll() {
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)
        return contObj
    }

    async getRandom() {
        let contObj = await this.getAll()
        let posObj = random.int(0, (contObj.length - 1))
        let result = contObj[posObj]
        return (result)
    }

}

app.get('/', (req, res) => {
    res.send(`Root`)
})

app.get('/productos', async(req, res) => {
    const prods = await container.getAll()
    res.send(prods)
})

app.get('/productoRandom', async(req, res) => {
    const prods = await container.getRandom()
    res.send(prods)
})


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

let container = new Cont("productos.txt")