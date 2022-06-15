const express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')
// >>>> Requiere

const userControllers = require('../controllers/userController')


// >>>> Express Validator

const validacion = [
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
      .withMessage("Debe contener minimo 5 caracteres")
]

// >>>>> Rutas 

// router.get('/', userControllers.users); //products
router.get('/login', userControllers.login);
router.post('/login/loginPost', userControllers.loginPost);

router.get('/register', userControllers.register);
router.post('/register/create', validacion, userControllers.registerPost);

module.exports = router;   