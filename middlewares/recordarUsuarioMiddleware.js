// let recordarUsuarioMiddleware = (req, res, next) => {
//     if (req.body.recordar) {
//         res.cookie("emailRecordado", req.body.email, 1000000000)
//         res.cookie("passwordRecordada", req.body.password, 10000000)
//     } else {
//         res.cookie("emailRecordado", "", 1000000000)
//         res.cookie("passwordRecordada", "", 10000000)
//     }
//     next()
// }

///


const usersFunctions = require("../models/userModel");

function recordarUsuarioMiddleware (req,res,next) {
	res.locals.usuarioEstaLogiado = false;

	let emailInCookie = req.cookies.userEmail
	let userFromCookie = usersFunctions.findAlgo('email', emailInCookie);

	if(userFromCookie){
		req.session.usuarioLogiado = userFromCookie;
	}

	if (req.session && req.session.usuarioLogiado) {
		res.locals.usuarioEstaLogiado = true;
		res.locals.usuarioLogiado = req.session.usuarioLogiado;
	}
	next()
}


module.exports = recordarUsuarioMiddleware;