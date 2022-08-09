import { useEffect, useState } from "react";

function ApiCount() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/products";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    return setInformacion(apiJSON)
  }

  useEffect(() => {
    fetchApis()
    console.log(informacion.count);
  }, []);

  useEffect(() => {
    console.log('Actualizado');
  }, [informacion]);
 
  useEffect(() => {
    return () => console.log('Componente desmontado');
  }, []);

  // let countCategory = Object.keys(informacion.countByCategory)
  
  let countCategory = 'probando texto'
  


  return (
    <div>
      <h3>{informacion.count}</h3>

    </div>
  );
}

export default ApiCount;
