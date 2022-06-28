const fs = require('fs')
const path = require('path');
const productFunctions = require('../models/Products');
const {validationResult} = require('express-validator')
const db = require('../database/models');


const productsFilePath = path.join(__dirname, '../data/productos.json');

const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  
  products: (req, res) => {
     res.render("products", {productos:productos})
    // db.Producto.findAll()
    //   .then(productoInfo => res.render("products", {productos:productoInfo}))
},

  productCart: (req, res) => res.render("productCart"),
  
  productDetail: (req, res) => {
    // let {idProduct} = req.params.id;
    db.Product.findByPk(1 , {include: ['marca']})
      .then (data => res.send(data))
    // let productoBuscado = productFunctions.findPK(idProduct)
    // res.render("productDetail", {'productoBuscado' : productoBuscado});
    // res.render("productDetail", {'productoBuscado' : productoBuscado});
    //   db.Producto.findByPk(idProduct)
    //   // Aun no estan configuradas las relaciones entre tablas es por eso que hay una variable de más llamada talle
    //     .then(productoBuscado=> res.render("productDetail", {productoBuscado: productoBuscado, talle: [36,37,38] }))
  }, 
  
  
  editProductos: (req, res) => {
    let {idProduct} = req.params;
    let productoBuscado = productFunctions.findPK(idProduct)
    res.render("editProductos", {producto:productoBuscado})
  },
  
  edit: (req, res) => {
    let {idProduct} = req.params;
    let image;
    
    // let error = validationResult(req);
    // HACER ERRORS
   

      function indexProduct() {			
			let selectedProduct = productos.find(element => element.id == idProduct);
			return productos.indexOf(selectedProduct);		
		};

    console.log(indexProduct());

    
    if(req.file != undefined) {
			image = req.file.filename
		} else {
      image = 'zapasDefault.png'
    }


    let talle = []
    let talleBody = req.body.talle
    if (typeof talleBody == 'string') {
      talle.push(talleBody)
    } else {
      talle = talleBody
      }

    let nuevaInfo = req.body 
		let productoEditado = {
			"id" : idProduct,
			...nuevaInfo,
			"image": image,
      "talle": talle
		};
    
    productos[indexProduct()] = productoEditado;

  
  
    let archivoJSON = JSON.stringify(productos, null, ' ');
    fs.writeFileSync(productsFilePath, archivoJSON);

    res.redirect("/products");
      
    


  },

  deleteProduct: (req, res) => {
    let id = req.params.idProduct;
    productFunctions.delete(id);
    res.redirect("/products");
  },
  
   
  createProduct: (req, res) => {
    let error = validationResult(req);
    if (error.isEmpty()) {
     
      let talle = []
      let talleBody = req.body.talle
      if (typeof talleBody == 'string') {
        talle.push(talleBody)
      } else {
        talle = talleBody
        }
      
  
      let nuevaInfo = req.body 
      let newProduct = {
        ...nuevaInfo,
        "image": req.file.filename,
        "talle": talle
      };
  
      productFunctions.create(newProduct)
  
      res.redirect('/products')
      
    } else res.render("create", {error:error.mapped(), old: req.body})

  },

  createView: (req, res) => { res.render("create")}


};


module.exports = controller;