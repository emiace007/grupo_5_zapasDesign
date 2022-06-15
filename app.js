const express = require("express");
const createError = require('http-errors');
const app = express();
const methodOverride = require ("method-override")
const path = require("path");


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(3000, () => console.log("Puerto 3000 funcionando correctamente"));

app.set('view engine', 'ejs')

app.use(methodOverride ("_method"))
app.use("/static", express.static(__dirname + "/public"));

let indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute);

let productsRoute = require('./routes/productsRoute')
app.use('/products', productsRoute);

let userRoute = require('./routes/userRoute')
app.use('/user', userRoute);
