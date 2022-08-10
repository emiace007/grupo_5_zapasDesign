import { React } from "react";
import "./App.css";
import Contenedor from "./components/Contenedor";
import ApiCount from "./components/ApiCount";
import ApiCategoryCount from "./components/ApiCategoryCount";
import ApiUltimoProduct from "./components/ApiUltimoProduct";
import ApiUltimoUser from "./components/ApiUltimoUser";
import ApiListaCategorias from "./components/ApiListaCategorias";
import ApiListaProducts from "./components/ApiListaProducts";

function App() {
  return (
    <div className="App">
      <h1 className="tituloPrincipal">PANEL DE CONTROL</h1>

      <div className="totales">
        <h2>Totales</h2>
        <div className="contenedorTotales">
          <Contenedor
            classProp="contenedorIndividual"
            titulo="Productos"
            enlace={<ApiCount urlApi="/api/products" />}
          />
          <Contenedor
            classProp="contenedorIndividual"
            titulo="Usuarios"
            enlace={<ApiCount urlApi="/api/users" />}
          />
          <Contenedor
            classProp="contenedorIndividual"
            titulo="Categorias"
            enlace={<ApiCategoryCount />}
          />
        </div>
      </div>

      <div className="ultimoCreado">
        <h2>Ultimo creado</h2>
        <Contenedor
          titulo="Ultimo producto creado:"
          enlace={<ApiUltimoProduct />}
        />
        <Contenedor
          titulo="Ultimo usuario creado:"
          enlace={<ApiUltimoUser />}
        />
      </div>

      <Contenedor
        titulo="Panel de categorías con el total de productos de cada una:"
        enlace={<ApiListaCategorias />}
      />
      <Contenedor
        titulo="Listado de productos:"
        enlace={<ApiListaProducts />}
      />
    </div>
  );
}

export default App;
