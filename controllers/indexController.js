const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  index: (req, res) => res.render("index"),
  login: (req, res) => res.render("login"),
  productCart: (req, res) => res.render("productCart"),
  productDetail: (req, res) => {
    id = req.params.id
    let productoBuscado = productos.find(product => product.id == id) 
    res.render("productDetail", {productoBuscado : productoBuscado})
  }, 
  register: (req, res) => res.render("register"),
  products: (req, res) => res.render("products", {productos:productos}),
  editProductos: (req, res) => res.render("editProductos", {productos:productos}),
};

module.exports = controller;