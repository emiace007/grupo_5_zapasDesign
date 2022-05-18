const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  productCart: (req, res) => res.render("productCart"),
  productDetail: (req, res) => {
    let {idProduct} = req.params;
    let productoBuscado = productos.find(product => product.id == idProduct);
    res.render("productDetail", {'productoBuscado' : productoBuscado});
  }, 
  products: (req, res) => res.render("products", {productos:productos}),
  editProductos: (req, res) => res.render("editProductos", {productos:productos}),
};

module.exports = controller;