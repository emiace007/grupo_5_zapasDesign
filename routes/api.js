const express = require ("express");
const router = express.Router();

const apiControllers = require('../controllers/apiController')



router.get('/users', apiControllers.users);
router.get('/users/:id', apiControllers.userDetail);
router.get('/products', apiControllers.products);
router.get('/products/:id', apiControllers.productDetail);


module.exports = router;   



