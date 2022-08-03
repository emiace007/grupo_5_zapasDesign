import React from "react";
import "./App.css";
import Contenedor from "./components/Contenedor";
// import apiUser from './components/ApiUser';

function App() {
  return (
    <div className="App">
      <h1>PANEL DE CONTROL</h1>
      <Contenedor titulo="Total de productos:" enlace="apiProductosCount" />
      <Contenedor titulo="Total de usuarios:" enlace="apiUsersCount" />
      <Contenedor titulo="Total de categorias:" enlace="apiCategoriasCount" />
    </div>
  );
}

export default App;
