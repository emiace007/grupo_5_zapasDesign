const express = require ("express");
const router = express.Router();

const controller = require('../controllers/indexController')

router.get('/', controller.index);

router.get('/login', controller.login);

router.get('/productCart', controller.productCart);

router.get('/productDetail', controller.productDetail);

router.get('/register', controller.register);

router.get('/listaProductos', controller.listaProductos);

router.get('/editProductos', controller.editProductos);


module.exports = router;    