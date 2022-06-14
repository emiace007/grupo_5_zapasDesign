const express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')
// >>>> Requiere

const userControllers = require('../controllers/userControllers')


// >>>> Express Validator

const validacion = [
    body('nameSurname').notEmpty().withMessage('Debes agregar un nombre'),
    body('username').notEmpty().withMessage('Debes agregar nombre de usuario'),
    body('email').notEmpty().withMessage('Debes poner un email'),
    body('password').notEmpty().withMessage('Debes asignar una contraseña'),
    
]

// >>>>> Rutas 

router.get('/', userControllers.users); //products


module.exports = router;   