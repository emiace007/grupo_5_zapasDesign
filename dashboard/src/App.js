import { React } from "react";
import "./App.css";
import Contenedor from "./components/Contenedor";
import ApiCount from "./components/ApiCount";
import ApiCategoryCount from "./components/ApiCategoryCount";
import ApiUltimoProduct from "./components/ApiUltimoProduct";
import ApiUltimoUser from "./components/ApiUltimoUser";

function App() {
  return (
    <div className="App">
      <h1>PANEL DE CONTROL</h1>
      <Contenedor
        titulo="Total de productos:"
        enlace=<ApiCount urlApi="/api/products" />
      />
      <Contenedor
        titulo="Total de usuarios:"
        enlace=<ApiCount urlApi="/api/users" />
      />
      <Contenedor
        titulo="Total de categorias:"
        enlace=<ApiCategoryCount/>
      />


      <Contenedor
        titulo="Ultimo producto creado:"
        enlace=<ApiUltimoProduct/>
      />
      <Contenedor
        titulo="Ultimo usuario creado"
        enlace=<ApiUltimoUser/>
      />

      <Contenedor
        titulo="Panel de categorías con el total de productos de cada una."
        enlace="data"
      />
      <Contenedor
        titulo="Panel con el listado de productos."
        enlace="data"
      />
    
      
    </div>
  );
}

export default App;
