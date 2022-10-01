const fs = require('fs')

class Contenedor{
    constructor(archive){
        this.archive= archive;
        this.products = [];
    }

    async read(){
        try{
            let dB = await fs.promises.readFile(this.archive, 'utf-8')
            return dB
        }catch(e){
            console.log("error")
        }
    }

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    } 

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
            await  fs.promises.writeFile(this.archive, JSON.stringify(this.products, null, 2))
        }catch(e){
            console.error("No se pudo guardar" + e)
        }
    }

    getById(id){
        let resultId = this.products.find(prod => prod.id == id)
        return resultId
    }

    async getAll(){
        return this.products
    }

    deleteById(id){
        this.products = this.getAll().filter(prod => prod.id !== id)
        return {msg: `Producto con el id ${id} eliminado.`}
    } catch(e){
        return e
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, "[]")
    }

    async updateById(updateProduct, id){
        const productos = await this.getAll();
        try {
            const productoId = productos.indexOf(productos.find(obj => { if (obj.id === id) {return obj} }))
            if (productoId >= 0) {
                productos.splice(productoId, 1, updateProduct)
                await fs.promises.writeFile(`./${this.archive}.txt`, JSON.stringify(this.products, null, 2))
                console.log(`Se actualizó el item id ${id}`)
            } else if (productoId < 0) {
                console.log(`El id ${id} no existe`)
                throw new Error (`No existe item con Id ${id}`)
            }
        } catch (error) {
            console.log("Error", error)
            throw new Error (`No existe item con Id ${id}`)
        }
    }
}

const contenedor = new Contenedor("products")

module.exports = Contenedor