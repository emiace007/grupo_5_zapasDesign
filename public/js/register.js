window.onload = function() {
        let nombre = document.getElementById('nombre')
        let apellido = document.getElementById('apellido')
        let email = document.getElementById('email')
        let password = document.getElementById('password')
        let imagen = document.getElementById('files')
        let form = document.querySelector('form')
        
        let h1 = document.querySelector('h1')
        
       
        console.log(nombre);
        
        

        nombre.focus();

        form.addEventListener("submit", (e) => {
            
            let error = []

            // NOMBRE
            if (nombre.value == "") {
                error.push("El campo nombre es obligatorio")
            } else if (nombre.value.length < 2) {
                error.push("El campo nombre debe tener al menos 2 caracteres")
            } else {
                apellido.focus();
            }
           
            // APELLIDO
            if (apellido.value == "") {
                error.push("El campo apellido es obligatorio")
            } else if (apellido.value.length < 2) {
                error.push("El campo apellido debe tener al menos 2 caracteres")
            } else {
                email.focus();
            }
          
            // EMAIL
            if (email.value == "") {
                error.push("El campo email es obligatorio")
            } else {
                password.focus();
            }

            // PASSWORD
            if (password.value == "") {
                error.push("El campo password es obligatorio")
            } else if (password.value.length < 2) {
                error.push("El campo password debe tener al menos 2 caracteres")
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
                    error.push("Solo se permiten archivos .jpg / .jpeg / .png / .gid")
                }
            }

            if (error.length>0){
                e.preventDefault();
                document.getElementById("myBtn").disabled = true;

                let ulErrores = document.querySelector('.errores')

            for (let i = 0; i < error.length; i++) {
                    ulErrores.innerHTML += "<li>" + error[i] + "</li>";
                  }
            } else {
                document.getElementById("myBtn").disabled = false;
            }
        })
}