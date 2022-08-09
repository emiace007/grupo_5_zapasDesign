import { useEffect, useState } from "react";

function ApiCount() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/products";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    const categorias = apiJSON.countByCategory
    let countCategory = Object.keys(categorias).length
    return setInformacion(countCategory)
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

export default ApiCount;
