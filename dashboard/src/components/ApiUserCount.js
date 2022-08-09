import { useEffect, useState } from "react";

function ApiUserCount() {
  const [informacion, setInformacion] = useState([]);

  const url = "/api/users";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json()
    return setInformacion(apiJSON)
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
      <h1>API USER COUNT</h1>
      <h3>{informacion.count}</h3>
      {/* {!informacion
        ? "Cargando..."
        : informacion.map((informacion) => {
            return <h3>{informacion.count}</h3>;
          })} */}
    </div>
  );
}

export default ApiUserCount;
