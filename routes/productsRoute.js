const express = require ("express");
const router = express.Router();

const path = require('path')

// >>>> Requiere

const productController = require('../controllers/productController')

// >>>> Multer

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, __dirname + '/../public/images/productos')
    },

    filename: function(req, file, callback){
        const newFileName = Date.now() + path.extname(file.originalname);
        callback(null, newFileName);
    }
})

const fileUpload = multer({storage: storage})

// >>>>> Rutas 

router.get('/', productController.products); //products

router.get('/productCart', productController.productCart); //products/cart

router.get('/editProductos', productController.editProductos); //products/edit/:id?

router.get('/:idProduct', productController.productDetail); //products/detail/:id

router.post('/create', fileUpload.single('imagen'), productController.createProduct)


module.exports = router;   