import { useEffect, useState } from "react";

function ApiListaCategorias() {
  const [names, setnames] = useState([]);
  const [cantidad, setCantidad] = useState([]);

  const url = "/api/products";

  const fetchApis = async () => {
    const response = await fetch(url);
    const apiJSON = await response.json();
    const busqueda = apiJSON.countByCategory;
    const names = Object.keys(busqueda);
    const cantidad = Object.values(busqueda);
    return setnames(names), setCantidad(cantidad);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  useEffect(() => {
    // console.log('Actualizado');
  }, [names, cantidad]);

  useEffect(() => {
    return () => console.log("Componente desmontado");
  }, []);

  return (
    <div>
      {names.length === 0 && cantidad.length === 0 && <p>Cargando...</p>}
      <div className="name">
        {names.map((data) => {
          return (
            <div>
              <p>{data}</p>
            </div>
          );
        })}
      </div>
      <div className="cantidad">
        {cantidad.map((data) => {
          return (
            <div>
              <p>{data}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApiListaCategorias;
