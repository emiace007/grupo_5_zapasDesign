import { useEffect, useState } from "react";

function ApiUserCount() {
  const [informacion, setInformacion] = useState();

  useEffect(() => {
    const url = "http://localhost:3001/api/users";

    fetch(url)
      .then((response) => response.json)
      .then((data) => {
        setInformacion(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>API USER COUNT</h1>
      
      {!informacion ? "Cargando..." : 
      informacion.map((informacion) => {
        return(
          <h3>{informacion.count}</h3>
        )
      })}
    </div>
  );
}

export default ApiUserCount;
