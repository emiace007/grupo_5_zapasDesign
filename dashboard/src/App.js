import { React } from "react";
import "./App.css";
import Contenedor from "./components/Contenedor";
import ApiCount from "./components/ApiCount";
import ApiCategoryCount from "./components/ApiCategoryCount";
import ApiUltimoObjeto from "./components/ApiUltimoObjeto";
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
            classProp="totalesIndividual"
            titulo="Productos"
            enlace={<ApiCount urlApi="/api/products" />}
          />
          <Contenedor
            classProp="totalesIndividual"
            titulo="Usuarios"
            enlace={<ApiCount urlApi="/api/users" />}
          />
          <Contenedor
            classProp="totalesIndividual"
            titulo="Categorias"
            enlace={<ApiCategoryCount />}
          />
        </div>
      </div>

      <div className="ultimoCreado">
        <h2>Ultimo creado</h2>
        <div className="contenedorCreados">
          <Contenedor
            classProp="creadosIndividual"
            titulo="Producto:"
            enlace={
              <ApiUltimoObjeto url="/api/products" api="products" dato="name" />
            }
          />
          <Contenedor
            classProp="creadosIndividual"
            titulo="Usuario:"
            enlace={
              <ApiUltimoObjeto url="/api/users" api="users" dato="name" />
            }
          />
          <Contenedor
            classProp="creadosIndividual"
            titulo="Email:"
            enlace={
              <ApiUltimoObjeto url="/api/users" api="users" dato="email" />
            }
          />
        </div>
      </div>

      <div className="categorias">
        <Contenedor
          titulo="Categorias / Cantidad"
          enlace={<ApiListaCategorias />}
        />
      </div>

      <div className="productos">
        <Contenedor
          titulo="Listado de productos:"
          enlace={<ApiListaProducts />}
        />
      </div>
    </div>
  );
}

export default App;
