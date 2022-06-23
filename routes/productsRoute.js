express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')

// >>>> Controller

const productController = require('../controllers/productController')

// >>>> Multer

const multer = require('multer');
const res = require("express/lib/response");

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, __dirname + '/../public/images/productos')
    },

    filename: function(req, file, callback){
        const newFileName = 'new-' + Date.now() + path.extname(file.originalname);
        callback(null, newFileName);
    }
})


const fileUpload = multer({storage: storage})

// >>>> Express Validator

const validacion = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("Debes agregar un nombre de producto"),
  body("price")
    .notEmpty()
    .withMessage("Debes agregar un precio"),
  body("category")
    .notEmpty()
    .withMessage("Debes seleccionar por lo menos una opcion de categoria"),
  body("marca")
    .notEmpty()
    .withMessage("Debes asignar la marca de tu producto"),
  body("talle")
    .notEmpty()
    .withMessage("Debes seleccionar por lo menos un talle"),
  body("description")
    .notEmpty()
    .withMessage("Debes agregar una breve descripcion"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    if (!file) {
      throw new Error("Debes incluir una imagen de tu producto");
    }
    return true;
  }),
];

// >>>>> Rutas 

router.get('/', productController.products); //products

router.get('/productCart', productController.productCart); //products/cart

router.get('/create', productController.createView)
router.post('/create', fileUpload.single('imagen'),validacion, productController.createProduct)

router.get('/:idProduct', productController.productDetail); //products/:id  detalle

router.get('/:idProduct/editProducts', productController.editProductos); //products/:id/edit
router.put('/:idProduct/editProducts',fileUpload.single('imagenActualizada'),validacion, productController.edit); //editar

router.delete('/:idProduct', productController.deleteProduct); //eliminar

module.exports = router;   