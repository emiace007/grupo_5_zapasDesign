const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  
  products: (req, res) => res.render("products", {productos:productos}),

  productCart: (req, res) => res.render("productCart"),
  
  productDetail: (req, res) => {
    let {idProduct} = req.params;
    let productoBuscado = productos.find(product => product.id == idProduct);
    res.render("productDetail", {'productoBuscado' : productoBuscado});
  }, 
  
  
  editProductos: (req, res) => {
    let {idProduct} = req.params;
    let productoBuscado = productos.find(product => product.id == idProduct);
    res.render("editProductos", {producto:productoBuscado})
  },
  
  edit: (req, res) => {
    let id = req.params.idProduct
    let nuevaInfo = req.body
    res.redirect("/")
    
  },

  deleteProduct: (req, res) => {
    let id = req.params.idProduct

    newList = productos.filter(productos => productos.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(newList, null, " "))
    res.redirect("/products")
  },
  
  
   
  createProduct: (req, res) => {
    let newProduct = {
      id: generarId(),
      price: req.body.precio,
      nombreProducto: req.body.producto,
      image: req.file.filename,
      category: ["deportes"],
      marca: req.file.marca,
      description: req.body.descripcion,
    }

    productos.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(productos))

    res.redirect('/products')
  },


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