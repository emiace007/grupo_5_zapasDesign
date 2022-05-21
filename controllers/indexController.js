const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  index: (req, res) => res.render("index"),
  login: (req, res) => res.render("login"),
  register: (req, res) => res.render("register"),
};

module.exports = controller;