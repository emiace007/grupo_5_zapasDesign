import { useEffect, useState } from "react";

function ApiListaCategorias() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/products";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    const busqueda = apiJSON.countByCategory
    const names = Object.keys(busqueda)
    // const cantidad = Object.keys(busqueda).forEach(key => {
    //   return(key, busqueda[key]);
    // });
    return setInformacion(names)
  }

  useEffect(() => {
    fetchApis()
  }, []);

  useEffect(() => {
    console.log('Actualizado');
  }, [informacion]);
 
  useEffect(() => {
    return () => console.log('Componente desmontado');
  }, []);


  return (
    <div>
      {/* <h3>{informacion}</h3> */}
      {!informacion
        ? "Cargando..."
        : informacion.map((data) => {
            return (
              <div>
                <h3>{data}</h3>
              </div>
            )
          })}
    </div>
  );
}

export default ApiListaCategorias;
