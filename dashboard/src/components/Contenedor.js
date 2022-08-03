import React from 'react';


function Contenedor(props) {
  return (
    <div>
      <h1>{props.titulo}</h1>
      <p>{props.enlace}</p>
    </div>

  );
}

export default Contenedor;