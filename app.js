const express = require("express");
const createError = require('http-errors');
const app = express();
const methodOverride = require ("method-override")
const path = require("path");
const session = require('express-session')
const cookies = require('cookie-parser')
const recordarUsuarioMiddleware = require('./middlewares/recordarUsuarioMiddleware')

// const cookieUser = require('./middlewares/cookieUser')
// app.use(cookieUser)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(3000, () => console.log("Puerto 3000 funcionando correctamente"));

app.set('view engine', 'ejs')

app.use(methodOverride ("_method"))
app.use("/static", express.static(__dirname + "/public"));
app.use(session({
    secret: 'Esto es un secreto',
    resave: false,
    saveUninitialized: false
}))

app.use(cookies())

//Middleware para que todas las vistas puedan tener acceso al usuario
app.use(function(req, res, next) {
    res.locals.user = req.session.usuarioLogiado;
    next();
  });

app.use(recordarUsuarioMiddleware)

// RUTAS

let indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute);

let productsRoute = require('./routes/productsRoute')
app.use('/products', productsRoute);

let userRoute = require('./routes/userRoute')
app.use('/user', userRoute);

