const express = require ("express");
const router = express.Router();

const apiControllers = require('../controllers/apiController')



router.get('/users', apiControllers.users);
router.get('/products', apiControllers.products);


module.exports = router;   



