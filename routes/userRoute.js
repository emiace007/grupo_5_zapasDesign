const express = require ("express");
const router = express.Router();

const path = require('path')
const {body} = require('express-validator')

// >>>> Controller

const userControllers = require('../controllers/userController')

// >>>> MiddleWares
const userLogiado = require('../middlewares/userLogiado')
const recordarUsuarioMiddleware = require('../middlewares/recordarUsuarioMiddleware')
const noLogeado = require('../middlewares/noLogeado')

// >>>> Multer

const multer = require('multer');

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
    body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es obligatorio")
      .isLength({ min: 2 })
      .withMessage("Debe contener minimo 2 caracteres"),
    body("apellido")
      .notEmpty()
      .withMessage("El campo apellido es obligatorio"),
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
      .isLength({ min: 8 })
      .withMessage("Debe contener minimo 8 caracteres"),
      body("imagen").custom((value, { req }) => {
        let file = req.file;
        if (!file) {
          throw new Error("Debes incluir una imagen de tu producto");
        }
        return true;
      }),
    // body("imagen").custom((value, { req }) => {
    //   let aceptarExtensiones = [ '.jpg', '.jpeg', '.png', '.gif' ]
    //   let extensionDeMiArchivo = path.extname(file.originalname);
      
    //   (!aceptarExtensiones.includes(extensionDeMiArchivo)) 
    //   })
]




const validacion_edit = [
    body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es obligatorio"),
    body("apellido")
      .notEmpty()
      .withMessage("El campo apellido es obligatorio"),
    body("email")
      .notEmpty()
      .withMessage("El campo email es obligatorio")
      .bail()
      .isEmail()
      .withMessage("El email debe ser valido"),
]

// >>>>> Rutas 

// router.get('/', userControllers.users); //products
router.get('/login',userLogiado, userControllers.login);
router.post('/login/loginPost',validacion_registro, recordarUsuarioMiddleware, userControllers.loginPost);

router.get('/register',userLogiado, userControllers.register);
router.post('/register/create', fileUpload.single('imagen'), validacion_registro, userControllers.registerPost);

router.get('/perfil',noLogeado, userControllers.perfil)
router.get('/logout', userControllers.logout)

router.get('/edit/:id',noLogeado, userControllers.edit);
// Actualiza perfectamente pero hay que cerrar sesion y volver a iniciar.
router.post('/edit/update/:id', fileUpload.single('imagen'), validacion_edit, userControllers.editPost);

module.exports = router;   



