const express = require ("express");
const router = express.Router();

// >>>> Requiere

const productController = require('../controllers/productController')

// >>>>> Rutas 

router.get('/', productController.products); //products

router.get('/productCart', productController.productCart); //products/cart

router.get('/editProductos', productController.editProductos); //products/edit/:id?

router.get('/:idProduct', productController.productDetail); //products/detail/:id


module.exports = router;   