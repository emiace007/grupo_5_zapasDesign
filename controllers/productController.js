const fs = require('fs')
const path = require('path');
const productFunctions = require('../models/Products');
const {validationResult} = require('express-validator')
const db = require('../database/models');
// const { Association } = require('sequelize/types');


const productsFilePath = path.join(__dirname, '../data/productos.json');

const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  
  products: (req, res) => {
    db.Product.findAll()
      .then(productoInfo => res.render("products", {productos:productoInfo}))     

},

  productCart: (req, res) => res.render("productCart"),
  
  productDetail: (req, res) => {
    let {idProduct} = req.params;
    db.Product.findByPk(idProduct , {include: [
      {association: 'marca'},
      {association: 'categorias'},
      {association: 'talle'}
    ]})    
      // .then(data => res.send(data)) 
      .then(productoBuscado=> res.render("productDetail", {productoBuscado: productoBuscado}))
  }, 
  
  
  editProductos: async (req, res) => {
    let {idProduct} = req.params;
    const categorias = await db.Category.findAll();
    const talles = await db.Size.findAll();
    const marcas = await db.Brand.findAll();
    const productoBuscado = await db.Product.findByPk(idProduct,  {include: [
      {association: 'marca'},
      {association: 'categorias'},
      {association: 'talle'}
    ]})
    // return res.send([categorias,  productoBuscado])
    return res.render("editProductos", {producto:productoBuscado, categorias: categorias, talles: talles, marcas: marcas})
  },
  

  // EDITAR EL PRODUCTO >>>>>>>>>>>>><<
  edit: async (req, res) => {
    let {idProduct} = req.params;
    let image;
    
    // let error = validationResult(req);
    // HACER ERRORS
 
   
    if(req.file != undefined) {
			image = req.file.filename
		} else {
      image = 'zapasDefault.png'
    }


    let talleInput = []
    let talleBody = req.body.talle
    if (typeof talleBody == 'string') {
      talleInput.push(talleBody)
    } else {
      talleInput = talleBody
      }

    let categoryInput = []
    let categoryBody = req.body.category
    if (typeof categoryBody == 'string') {
      categoryInput.push((categoryBody))
    } else {
      categoryInput = (categoryBody)
      }


    await db.Product.update({
      precio: req.body.price,
      nombre: req.body.nombreProducto,
      imagen: image,
      descripcion: req.body.description,
      brand_id: req.body.marca,
    }, 
    {where: {id: idProduct}}
      );      

    const editedProduct = await db.Product.findByPk(idProduct)
      // Set permite pasar datos a la tabla intermedia, reemplaza lo datos actuales por el input que se pase
      await editedProduct.setCategorias(categoryInput)
      await editedProduct.setTalle(talleInput)
    
    // return res.send(req.body.talle)
    return res.redirect(`/products/${idProduct}`);
      
  },

  // ELIMINAR PRODUCTO DE LA BASE DE DATOS >>>>>>>>>>>>>>>

  deleteProduct: async (req, res) => {

    let id = req.params.idProduct;
    await db.Product_category.destroy({where: {product_id: id}});
    await db.Product_size.destroy({where: {product_id: id}});
    await db.Product.destroy({where: {id: id}}, {include:[
      {association: 'marca'},
    ]});
    res.redirect("/products");
  },
  
  //CREACIÓN PRODUCTO EN BASE DE DATOS >>>>>>>>>>>>>>>>
  createProduct: async (req, res) => {
    let error = validationResult(req);
    if (error.isEmpty()) {

      let talleInput = []
      let talleBody = req.body.talle
      if (typeof talleBody == 'string') {
        talleInput.push(talleBody)
      } else {
        talleInput = talleBody
        }
      
      let categoryInput = []
      let categoryBody = req.body.category
      if (typeof categoryBody == 'string') {
        categoryInput.push(Number(categoryBody))
      } else {
        categoryInput = categoryBody
        }
 
      const newProduct =  await db.Product.create({
        precio: req.body.price,
        nombre: req.body.nombreProducto,
        imagen: req.file.filename,
        descripcion: req.body.description,
        brand_id: req.body.marca,
      });


      
      // CATEGORIES
      const categories = categoryInput;
      await newProduct.addCategorias(categories)

      // SIZES

      const sizes = categoryInput;
      await newProduct.addTalle(sizes)

      // res.send(categories)
    
      return res.redirect("/products")
      
    } else res.render("create", {error:error.mapped(), old: req.body})

  },

  createView: async (req, res) => {
    const marcas = await db.Brand.findAll()
    const categorias  = await db.Category.findAll()
    
    return  res.render("create", {allBrands:marcas, allCategories: categorias})
     
    }

};


module.exports = controller;