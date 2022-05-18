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

  createProduct: (req, res) => {
    let newProduct = {
      id: generarId(),
      price: req.body.precio,
      nombreProducto: req.body.producto,
      image: req.file.filename,
      category: ["deportes"],
      description: req.body.descripcion,
    }

    productos.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(productos))

    res.redirect('/products')
  }


};

//Hice esta función más que nada por miedo a que se puedan pisar las ids
function generarId() {
  let id = productos.length + 1;
  while (true) {
    if (productos.find(product => product.id == id)){
      id++
    }
    else {
      break
    }
  }
  return id;
}


module.exports = controller;