const express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')
// >>>> Requiere

const userControllers = require('../controllers/userController')

// >>>> MiddleWares
const userLogiado = require('../middlewares/userLogiado')
const noLogeado = require('../middlewares/noLogeado')

// >>>> Multer

const multer = require('multer');
// const res = require("express/lib/response");


const storage = multer.diskStorage({
  destination: function(req, file, callback){
      callback(null, __dirname + '/../public/images/users')
  },

  filename: function(req, file, callback){
      const newFileName = 'newUser-' + Date.now() + path.extname(file.originalname);
      callback(null, newFileName);
  }
})


const fileUpload = multer({storage: storage})


// >>>> Express Validator

const validacion_registro = [
    body("nombre").notEmpty().withMessage("El campo nombre es obligatorio"),
    body("apellido").notEmpty().withMessage("El campo apellido es obligatorio"),
    body("email")
      .notEmpty()
      .withMessage("El campo email es obligatorio")
      .bail()
      .isEmail()
      .withMessage("El email debe ser valido"),
    body("password")
      .notEmpty()
      .withMessage("El campo contraseña es obligatorio")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Debe contener minimo 5 caracteres"),
]

// >>>>> Rutas 

// router.get('/', userControllers.users); //products
router.get('/login',userLogiado, userControllers.login);
router.post('/login/loginPost',validacion_registro, userControllers.loginPost);

router.get('/register',userLogiado, userControllers.register);
router.post('/register/create', fileUpload.single('imagen'), validacion_registro, userControllers.registerPost);

router.get('/perfil',noLogeado, userControllers.perfil)
router.get('/logout', userControllers.logout)

module.exports = router;   