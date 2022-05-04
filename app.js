const express = require("express");
const app = express();

const path = require("path");

app.listen(3000, () => console.log("Puerto 3000 funcionando correctamente"));

app.set('view engine', 'ejs')

app.use("/static", express.static(__dirname + "/public"));

let indexRoute = require('./routes/indexRoute')

app.use('/', indexRoute);
