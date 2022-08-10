const fs = require('fs')
const path = require('path');
// const productFunctions = require('../models/Products');
const {validationResult} = require('express-validator')
const db = require('../database/models');

// const { Association } = require('sequelize/types');

// const productsFilePath = path.join(__dirname, '../data/productos.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
    const categoriasProducto = [];
    productoBuscado.categorias.forEach(element => {
      categoriasProducto.push(element.id)    
    });
    const tallesProducto = [];
    productoBuscado.talle.forEach(element => {
      tallesProducto.push(element.id)    
    });
    const image = 'zapas-prueba.jpg'

    // return res.send(productoBuscado)

    res.render("editProductos", {producto:productoBuscado, categorias: categorias, talles: talles, marcas: marcas, categoriasProducto, tallesProducto, image })
  },
  

  // EDITAR EL PRODUCTO >>>>>>>>>>>>><<
  edit: async (req, res) => {
      
    let {idProduct} = req.params;
    let image;

    const categorias = await db.Category.findAll();
    const talles = await db.Size.findAll();
    const marcas = await db.Brand.findAll();
    const productoBuscado = await db.Product.findByPk(idProduct,  {include: [
      {association: 'marca'},
      {association: 'categorias'},
      {association: 'talle'}
    ]});
    
    const categoriasProducto = [];
    productoBuscado.categorias.forEach(element => {
      categoriasProducto.push(element.id)    
    });
    const tallesProducto = [];
    productoBuscado.talle.forEach(element => {
      tallesProducto.push(element.id)    
    });
    
    let error = validationResult(req);
    if (error.isEmpty()) {
   
      if(req.file != undefined) {
        image = req.file.filename
      } else {
        image = 'zapas-prueba.jpg'
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

    } else res.render("editProductos", {producto: productoBuscado, categorias: categorias, talles: talles, marcas: marcas, categoriasProducto, tallesProducto, error:error.mapped()})

   
    

      
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
    console.log(error)
    if (error.isEmpty()) {
      if(req.file != undefined) {
        image = req.file.filename
      } else {
        image = 'zapas-prueba.jpg'
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
        categoryInput.push(Number(categoryBody))
      } else {
        categoryInput = categoryBody
        }
        console.log('creando producto')
      const newProduct =  await db.Product.create({
        precio: req.body.price,
        nombre: req.body.nombreProducto,
        imagen: image,
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
      
    } else {
      
      const marcas = await db.Brand.findAll()
      const categorias  = await db.Category.findAll()
      console.log('asd')
      res.render("create", {error:error.mapped(), old: req.body, allBrands:marcas, allCategories: categorias})
    }

  },

  createView: async (req, res) => {
    const marcas = await db.Brand.findAll()
    const categorias  = await db.Category.findAll()
    
    return  res.render("create", {allBrands:marcas, allCategories: categorias})
     
    },

  searchProduct: async (req,res) =>{
    // const {Op} = require("sequelize");
    const Op = db.Sequelize.Op;

    let search = await db.Product.findAll ({
      where: {
        nombre:{[Op.like]: `%${req.body.buscar}%`}
      }
    })

    console.log(search);
    return res.render('products',{productos:search},)
  }

};


module.exports = controller;