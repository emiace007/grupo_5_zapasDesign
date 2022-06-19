let noLogeado = (req,res,next) => {
    if (!req.session.usuarioLogiado){
    res.redirect ("/user/login")
} else {
    next()}}

module.exports = noLogeado;