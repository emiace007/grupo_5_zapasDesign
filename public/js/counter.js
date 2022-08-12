window.onload = () => {
  let campoDescripcion = document.getElementById("description");
  let numero = document.getElementById("numero");
  numero.innerHTML = campoDescripcion.value.length;

  campoDescripcion.addEventListener("input", () => {
    const recordar = campoDescripcion.value.length;
    const color = recordar < 20 ? "#f2294e" : null;

    numero.innerHTML = `${recordar}`;
    numero.style.color = color;
  });
};
