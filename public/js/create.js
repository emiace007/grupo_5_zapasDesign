window.onload = function() {
        let nombre = document.getElementById('nombreProducto')
        let description = document.getElementById('description')
        let imagen = document.getElementById('files')
        let price = document.getElementById('price')
        let marca = document.getElementById('marca')
        let categoria = document.querySelectorAll('.categoriaInput')
        let talle = document.querySelectorAll('.check-talle')
        let form = document.querySelector('form')
        
        nombre.focus();

        form.addEventListener("submit", (e) => {
            let error = []

            // NOMBRE
            if (nombre.value == "") {
                error.push("El campo producto es obligatorio")
            } else if (nombre.value.length < 5) {
                error.push("El campo nombre debe tener al menos 5 caracteres")
            } else {
                description.focus();
            }
           
            // MARCA
            let marcaValue = marca.options[marca.selectedIndex].innerHTML
            let texto = "- Seleccione la marca -"

            if (marcaValue == texto) {
                error.push("Debes asignar una marca")
            }
 
            // CATEGORIA
            let checkeado = false
            
            for (let i = 0; i < categoria.length; i++) {
                if (categoria[i].checked) {
                    checkeado = true
                }    
            }
            if (checkeado == false ) {
                error.push("Debes asignar una categoria")
            } else {
                // imagen.focus();
            }

            // DESCRIPCION
            if (description.value == "") {
                error.push("El campo descripción es obligatorio")
            } else if (description.value.length < 20) {
                error.push("El campo descripción debe tener al menos 20 caracteres")
            } else {
                price.focus();
            }

             
            // TALLE          
            for (let i = 0; i < talle.length; i++) {
                if (talle[i].checked) {
                    checkeado = true
                }    
            }
            if (checkeado == false ) {
                error.push("Debes asignar un talle")
            } else {
                // imagen.focus();
            }

            // PRICE
            if (price.value == "") {
                error.push("Debes asignar un precio")
            } else {
                // imagen.focus();
            }


            // IMAGEN
            if (imagen.files.length == 0) {
                error.push("Debes agregar una imagen");
            } else {
                let fileName = imagen.files[0].name;
                let fileArray = fileName.split('.');
                let extension = fileArray[1];
                let extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];
                let validacion = extensionesValidas.includes(extension);
                if (!validacion) {
                    error.push("Solo se permiten archivos .jpg / .jpeg / .png / .gif")
                }
            }

            if (error.length>0){
                e.preventDefault();
                //document.getElementById("myBtn").disabled = true;

                let ulErrores = document.querySelector('.errores')
                ulErrores.innerHTML = "";

            for (let i = 0; i < error.length; i++) {
                    ulErrores.innerHTML += "<li>" + error[i] + "</li>";
                  }
            } else {
                //document.getElementById("myBtn").disabled = false;
            }
           
        })

        // COUNTER
        let campoDescripcion = document.getElementById("description");
        let numero = document.getElementById("numero");
        numero.innerHTML = campoDescripcion.value.length;
      
        campoDescripcion.addEventListener("input", () => {
          const recordar = campoDescripcion.value.length;
          const color = recordar < 20 ? "#f2294e" : null;
      
          numero.innerHTML = `${recordar}`;
          numero.style.color = color;
        });
}