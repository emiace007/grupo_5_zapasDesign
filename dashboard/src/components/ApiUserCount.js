import { useEffect, useState } from "react";

function ApiUserCount() {
  const [informacion, setInformacion] = useState();

  const url = "http://localhost:3001/api/users";
  // const url = "https://jsonplaceholder.typicode.com/todos";

  const fetchApis = async () =>{
    const response = await fetch(url)
    const apiJSON = await response.json() 
    setInformacion(apiJSON)
    console.log(apiJSON);
  }

  useEffect(() => {
    fetchApis()
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
