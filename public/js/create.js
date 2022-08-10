window.onload = function() {
        let nombre = document.getElementById('nombreProducto')
        let description = document.getElementById('description')
        let password = document.getElementById('password')
        let imagen = document.getElementById('files')
        let form = document.querySelector('form')
        
        let h1 = document.querySelector('h1')
        
        console.log(imagen.src);
        console.log(nombre);
        
        

        nombre.focus();

        form.addEventListener("submit", (e) => {
            let error = []

            // NOMBRE
            if (nombre.value == "") {
                error.push("El campo nombre es obligatorio")
            } else if (nombre.value.length < 5) {
                error.push("El campo nombre debe tener al menos 5 caracteres")
            } else {
                description.focus();
            }
           
            // DESCRIPCION
            if (description.value == "") {
                error.push("El campo descripción es obligatorio")
            } else if (description.value.length < 20) {
                error.push("El campo descripción debe tener al menos 20 caracteres")
            } else {
                imagen.focus();
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
}