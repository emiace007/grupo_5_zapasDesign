const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = ()=> JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersFunctions = {
  findPK: (id) => {
    let dataset = users()
    let idBuscado = dataset.find((productos) => productos.id == id);
    return idBuscado;
  },

  generarId: () => {
    let dataset = users()
    let id = dataset.length + 1;
    while (true) {
      if (usersFunctions.findPK(id)) {
        id++;
      } else {
        break;
      }
    }
    return id;
  },

  create: (data) => {
    let dataset = users()
    let nuevoProducto = {
      id: usersFunctions.generarId(),
      ...data,
    };
    dataset.push(nuevoProducto);
    fs.writeFileSync(usersFilePath, JSON.stringify(dataset, null, " "));
  },

  delete: (id) => {
    let dataset = users()
    let todosMenosUno = dataset.filter((prod) => prod.id != id);
    fs.writeFileSync(
      usersFilePath,
      JSON.stringify(todosMenosUno, null, " ")
    );
  },

  findAlgo: (categoria, texto) => {
    let dataset = users()
    let categoriaBuscada = dataset.find(
      (user) => user[categoria] == texto
    );

    return categoriaBuscada;
  },
};

module.exports = usersFunctions;
