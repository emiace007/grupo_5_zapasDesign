const express = require ("express");
const router = express.Router();

const controller = require('../controllers/indexController')


router.get('/productCart', controller.productCart); //products/cart

router.get('/:id', controller.productDetail); //products/detail/:id

router.get('/', controller.products); //products

router.get('/editProductos', controller.editProductos); //products/edit/:id?


module.exports = router;   