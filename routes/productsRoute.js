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

router.get('/:idProduct', productController.productDetail); //products/:id  detalle

// router.post('/create', fileUpload.single('imagen'), productController.createProduct)

router.get('/:idProduct/editProductos', productController.editProductos); //products/:id/edit

router.put('/:idProduct/editProductos', productController.edit); //editar
router.delete('/:idProduct', productController.deleteProduct); //eliminar

module.exports = router;   