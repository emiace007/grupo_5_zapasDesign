import {React} from "react";
import "./App.css";
import Contenedor from "./components/Contenedor";
import ApiUserCount from './components/ApiUserCount';

function App() {
  return (
    <div className="App">
      <h1>PANEL DE CONTROL</h1>
      <Contenedor titulo="Total de productos:" enlace="apiProductosCount" />
      <Contenedor titulo="Total de usuarios:" enlace="apiUsersCount" />
      <Contenedor titulo="Total de categorias:" enlace="apiCategoriasCount" />
      <ApiUserCount/>
    </div>
  );
}

export default App;
