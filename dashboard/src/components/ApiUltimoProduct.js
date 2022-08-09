import { useEffect, useState } from "react";

function ApiUltimoProduct() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/products";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    const busqueda = apiJSON.products
    const ultimoObj = busqueda[Object.keys(busqueda)[Object.keys(busqueda).length - 1]]
    const name = ultimoObj.name
    return setInformacion(name)
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
      <p>{informacion}</p>
    </div>
  );
}

export default ApiUltimoProduct;
