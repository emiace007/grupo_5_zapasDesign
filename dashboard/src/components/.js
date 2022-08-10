import React from 'react';


function Contenedor(props) {
  return (
    <div>
      <h3>{props.titulo}</h3>
      <p>{props.enlace}</p>
    </div>

  );
}

export default Contenedor;