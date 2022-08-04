const db = require('../database/models');

const controller = {
  users: (req, res) => 
  db.Users.findAll()
    .then((usuarios) => {
      
      let usuariosNew = [];

      usuarios.forEach( function( usuario ) {
        usuariosNew.push({
          id: usuario.id,
          name: usuario.nombre,
          email: usuario.email,
          detail: "users/detail/" + usuario.id,
        })
      } )

      console.log(usuarios[0].url)

      let objetoLiteral = {
        "count":usuarios.length,
        "users": usuariosNew,  
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


