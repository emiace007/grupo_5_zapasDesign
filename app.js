const express = require("express");
const app = express();

const path = require("path");

app.listen(3000, () => console.log("Puerto 3000 funcionando correctamente"));

app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/index.html"))
);

app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/login.html"))
);

app.get("/productCart", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/productCart.html"))
);

app.get("/productDetail", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/productDetail.html"))
);

app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/register.html"))
);
