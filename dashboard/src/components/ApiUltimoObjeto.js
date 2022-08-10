import { useEffect, useState } from "react";

function ApiUltimoObjeto(props) {
  const [informacion, setInformacion] = useState([]);

  const url = props.url;

  const fetchApis = async () => {
    const response = await fetch(url);
    const apiJSON = await response.json();
    const busqueda = apiJSON[props.api];
    const ultimoObj =
      busqueda[Object.keys(busqueda)[Object.keys(busqueda).length - 1]];
    const name = ultimoObj[props.dato];
    return setInformacion(name);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  useEffect(() => {
    // console.log('Actualizado');
  }, [informacion]);

  useEffect(() => {
    return () => console.log("Componente desmontado");
  }, []);

  return (
    <div>
      <p>{informacion}</p>
    </div>
  );
}

export default ApiUltimoObjeto;
