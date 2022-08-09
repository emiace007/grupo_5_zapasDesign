import { useEffect, useState } from "react";

function ApiCount(props) {
  const [informacion, setInformacion] = useState([]);

  const url = props.urlApi;

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    return setInformacion(apiJSON)
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
      <p>{informacion.count}</p>
      {/* {!informacion
        ? "Cargando..."
        : informacion.map((informacion) => {
            return <h3>{informacion.count}</h3>;
          })} */}
    </div>
  );
}

export default ApiCount;
