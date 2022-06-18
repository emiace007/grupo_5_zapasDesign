let logeado = (req,res,next) => {
    if (req.session.usuarioLogiado){
    res.redirect ("/user/perfil")
} else {
    next()}}

module.exports = logeado;