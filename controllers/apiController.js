const db = require('../database/models');

const controller = {
  users: (req, res) => 
  db.Users.findAll()
    .then((usuarios) => {
     
      let objetoLiteral = {
        "count":usuarios.length,
        "users": usuarios,  
        //detail
     }
      res.send(objetoLiteral)
    }),
  products: (req, res) => 
  db.Product.findAll()
    .then((productos) => {
     
      let objetoLiteral = {
        "count":productos.length,
        "products": productos,  
        //detail
     }
      res.send(objetoLiteral)
    }),
    
   

};

module.exports = controller;


