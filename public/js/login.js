window.onload = function() {
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let form = document.querySelector('form')

    email.focus();
    form.addEventListener("submit", (e) => {

        let error = []

        // EMAIL
        if (email.value == "") {
            error.push("Debe completar el cambio email")
        } else {
            apellido.focus();
        }

        // PASSWORD
        if (password.value == "") {
            error.push("El campo password es obligatorio")
        } else {
            imagen.focus();
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
