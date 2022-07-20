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
            e.preventDefault();
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

            // PASSWORD
            if (password.value == "") {
                error.push("El campo password es obligatorio")
            } else if (password.value.length < 2) {
                error.push("El campo password debe tener al menos 2 caracteres")
            } else {
                imagen.focus();
            }

            // IMAGEN
           
        })
}