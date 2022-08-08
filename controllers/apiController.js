const db = require("../database/models");

const controller = {
  users: (req, res) =>
    db.Users.findAll().then((usuarios) => {
      let usuariosNew = [];

      usuarios.forEach(function (usuario) {
        usuariosNew.push({
          id: usuario.id,
          name: usuario.nombre,
          email: usuario.email,
          detail: "users/detail/" + usuario.id,
        });
      });

      let objetoLiteral = {
        count: usuarios.length,
        users: usuariosNew,
      };
      res.send(objetoLiteral);
    }),

  userDetail: (req, res) => {
    userPk = req.params.id;
    db.Users.findByPk(userPk).then((user) => {
      let objetoLiteral = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        imagenURL: user.imagen,
      };

      res.send(objetoLiteral);
    });
  },

  products: async (req, res) => {
    const categoryNames = await db.Category.findAll();
    const productos = await db.Product.findAll({
      include: [{ association: "categorias" }],
    });

    let productosNew = [];

    productos.forEach(function (productos) {
      let categorias = productos.categorias.map((categoria) => {
        return categoria.categoria;
      });

      productosNew.push({
        id: productos.id,
        name: productos.nombre,
        descripcion: productos.descripcion,
        detail: "users/detail/" + productos.id,
        categoria: categorias,
      });
    });

    // 'countByCategory': {deporte: 2}, {coleccion:4}

    // async function countByCategory() {
    //   const categoriasDb = await db.Category.findAll({include: [{ association: "categorias" }]})
    //   const categorias_info = await categoriasDb
    //   return categorias_info
    // }

    // let countByCategory = () => {
    //   db.Category.findAll({include: [{ association: "categorias" }]})
    //   .then((categorias) => {return categorias})
    // }

    let objetoLiteral = {
      count: productos.length,
      products: productosNew,
      // countByCategory: countByCategory,
    };

    res.send(objetoLiteral);
  },
  productDetail: async (req, res) => {
    let productPk = req.params.id;
    let producto = await db.Product.findByPk(productPk, {
      include: [
        { association: "categorias" },
        { association: "talle" },
        { association: "marca" },
      ],
    });

    let relaciones = [];

    let categoriasPush = producto.categorias.map((categoria) =>{return categoria.categoria})
    let tallePush = producto.talle.map((talle) =>{return talle.talle});
    let marcaPush = producto.marca.marcas

    relaciones.push({
      categorias: categoriasPush,
      talle: tallePush,
      marca: marcaPush,
    });

    let objetoLiteral = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagenURL: producto.imagen,
      relaciones: relaciones,
    };

    res.send(objetoLiteral);
  },
};

module.exports = controller;
