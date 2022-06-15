const express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')
// >>>> Requiere

const userControllers = require('../controllers/userController')


// >>>> Express Validator

const validacion = [
    body('name').notEmpty().withMessage('Debes agregar un nombre'),
    body('apellido').notEmpty().withMessage('Debes agregar nombre de usuario'),
    body('email').notEmpty().withMessage('Debes poner un email'),
    body('password').notEmpty().withMessage('Debes asignar una contraseña'),    
]

// >>>>> Rutas 

// router.get('/', userControllers.users); //products
router.get('/login', userControllers.login);

router.get('/register', userControllers.register);
router.post('/register/create', userControllers.registerProcess);

module.exports = router;   