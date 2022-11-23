const express = require('express');
const path = require('path');
const router = express.Router();
const {
    getProductsTest,
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../controller/product.controller');

router.get('/productos-test', getProductsTest);
router.get('/test', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/products-test.html'));
});

router.post('/productos', createProduct);

router.get('/productos', getProducts);

router.get('/productos/:id', getProductById);

router.put('/productos/:id', updateProductById);

router.delete('/productos/:id', deleteProductById);

module.exports = router;