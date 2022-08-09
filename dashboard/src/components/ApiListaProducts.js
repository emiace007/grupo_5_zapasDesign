import { useEffect, useState } from "react";

function ApiListaProducts() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/products";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    const busqueda = apiJSON.products
    const names = Object.keys(busqueda)
    // const cantidad = Object.keys(busqueda).forEach(key => {
    //   return(key, busqueda[key]);
    // });
    return setInformacion(busqueda)
  }

  useEffect(() => {
    fetchApis()
  }, []);

  useEffect(() => {
    // console.log('Actualizado');
  }, [informacion]);
 
  useEffect(() => {
    return () => console.log('Componente desmontado');
  }, []);


  return (
    <div>
      {!informacion
        ? "Cargando..."
        : informacion.map((data) => {
            return (
              <div>
                <p>{data.name}</p>
              </div>
            )
          })}
    </div>
  );
}

export default ApiListaProducts;
