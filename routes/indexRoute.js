const express = require ("express");
const router = express.Router();

// >>>> Controller

const controller = require('../controllers/indexController')

// >>>>> Rutas 

router.get('/', controller.index);

module.exports = router;    

