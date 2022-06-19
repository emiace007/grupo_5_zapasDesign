const usersFunctions = require("../models/userModel");

let cookieUser = (req,res,next) => {
    // let emailCookie = req.cookies.userEmail
    
    // let usuarioDeCookie = usersFunctions.findAlgo('email', emailCookie)

    // if (usuarioDeCookie) {
    //     req.session.usuarioLogiado = usuarioDeCookie
    // }

    // next()

}

module.exports = cookieUser;