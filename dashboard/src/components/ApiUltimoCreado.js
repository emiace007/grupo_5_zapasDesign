import { useEffect, useState } from "react";

function ApiCount(props) {
  const [informacion, setInformacion] = useState([]);

  const url = props.urlApi;

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    const productos = apiJSON.products
    const last = "crear esto en ApiUltimoCreado"

    return setInformacion(last)
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
      <h3>{informacion}</h3>
    </div>
  );
}

export default ApiCount;
