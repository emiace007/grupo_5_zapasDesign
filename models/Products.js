const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productFunctions = {
  findPK: (id) => {
    let dataset = productos
    let idBuscado = dataset.find((productos) => productos.id == id);
    return idBuscado;
  },

  generarId: () => {
    let dataset = productos
    let id = dataset.length + 1;
    while (true) {
      if (productFunctions.findPK(id)) {
        id++;
      } else {
        break;
      }
    }
    return id;
  },

  create: (data) => {
    let dataset = productos
    let nuevoProducto = {
      id: productFunctions.generarId(),
      ...data,
    };
    dataset.push(nuevoProducto);
    fs.writeFileSync(productsFilePath, JSON.stringify(dataset, null, " "));
  },

  delete: (id) => {
    let dataset = productos
    let todosMenosUno = dataset.filter((prod) => prod.id != id);
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(todosMenosUno, null, " ")
    );
  },

//   findAlgo: (categoria, texto) => {
//     let categoriaBuscada = productos.find(
//       (productos) => productos[categoria] == texto
//     );

//     return categoriaBuscada;
//   },
};

module.exports = productFunctions;
