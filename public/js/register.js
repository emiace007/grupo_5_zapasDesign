window.onload = function() {
        let nombre = document.getElementById('nombre')
        let apellido = document.getElementById('apellido')
        let email = document.getElementById('email')
        let password = document.getElementById('password')
        let imagen = document.getElementById('files')
        let form = document.querySelector('form')
        
        let h1 = document.querySelector('h1')
        
        console.log(imagen.value);
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
                password.focus();
            }
          
            // EMAIL
            if (email.value == "") {
                error.push("El campo email es obligatorio")
            } else if (email.value.length < 2) {
                error.push("El campo email debe tener al menos 2 caracteres")
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