const fs = require('fs')

class Contenedor {
    constructor(rutaTexto) {
        this.rutaTexto = rutaTexto
    }


    async save(element) {
        try {
            const data = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8')
            const productosLista = JSON.parse(data)

            const nuevoProducto = {
                id: productosLista[productosLista.length - 1].id + 1,
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
            }

            productosLista.push(nuevoProducto)

            try {
                await fs.promises.writeFile(`${this.rutaTexto}.json`, JSON.stringify(productosLista, null, 4));

                console.log(`Nuevo producto guardado, N° ID: ${nuevoProducto.id}`)
            } catch {
                console.log('error cargar nuevo producto')
            }

            return nuevoProducto.id

        } catch (err) {
            const producto = {
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
                id: 1,
            }

            try {
                await fs.promises.writeFile(`${this.rutaTexto}.json`, JSON.stringify([producto], null, 4));
                console.log(`Nuevo producto guardado, N° ID: ${producto.id}`)

            } catch (err) {
                console.log('error crear y cargar nuevo producto', err)
            }
        }
    }


    async getAll() {
        try {
            const dataProductos = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8')
            const datos = JSON.parse(dataProductos)

            return datos
        } catch {
            console.log('Error al obtener todos los datos')
        }
    }


    async getById(id) {
        try {
            const dataProductos = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8');
            const datos = JSON.parse(dataProductos);
            const idProductos = datos.find(producto => producto.id === id);

            if (!idProductos) throw new Error('No existe ese producto');

            return idProductos;

        } catch (err) {
            console.log(err);
        }
    }

    async updateById(updateProduct, id) {
        const productos = await this.getAll();
        try {
            const productoId = productos.indexOf(productos.find(obj => { if (obj.id === id) { return obj } }))
            if (productoId >= 0) {
                productos.splice(productoId, 1, updateProduct)
                await fs.promises.writeFile(`./${this.rutaTexto}.json`, JSON.stringify(productos, null, 4))
                console.log(`Se actualizó el item id ${id}`)

            } else if (productoId < 0) {
                console.log(`El id ${id} no existe`)
                throw new Error(`No existe item con Id ${id}`)
            }
        } catch (error) {
            console.log("Error => ", error)
            throw new Error(`No existe item con Id ${id}`)
        }
    }


    async deleteById(id) {
        try {
            if (!id) {
                throw new Error('No se pasó ningún ID');
            }
            const listaProd = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8');
            const datos = JSON.parse(listaProd);
            const producto = datos.find(producto => producto.id === id);

            if (!producto) {
                throw new Error('No existe ese producto')

            } else {
                datos.splice(datos.indexOf(producto), 1);

                const nuevaLista = await fs.promises.writeFile(`./${this.rutaTexto}.json`, JSON.stringify(datos, null, 4))

                console.log(`Producto eliminado, ID: ${producto.id}`)

                return nuevaLista
            }

        } catch (err) {
            console.log(err)
        }

    }


    async deleteAll() {
        try {
            await fs.promises.unlink(`${this.rutaTexto}.json`)
            console.log(`Archivo eliminado!`)

        } catch (err) {
            console.log(`No se pudo eliminar el archivo`, err)
        }
    }

    async getArrayProd() {
        try {
            const arrayEntero = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8')
            const array = await JSON.parse(arrayEntero)

            return array.length

        } catch (e) {
            console.error(e)
        }
    }
}


const datoJson = new Contenedor('productos2');


module.exports = Contenedor;