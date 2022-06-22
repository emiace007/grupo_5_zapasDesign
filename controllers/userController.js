const usersFunctions = require("../models/userModel");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

//DATABASE
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const user = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
// Para el login estamos utilizando la funcion findPk que hizo Gasty y esta en models, es temporal y se va a reemplazar cuandoconectemos con la base de dato con sequsalize
const controller = {
  login: (req, res) => res.render("login", {emailRecordado: req.cookies.emailRecordado, passwordRecordada: req.cookies.passwordRecordada }),

  loginPost: (req, res) => {
	let usuarioALogiarse = usersFunctions.findAlgo('email', req.body.email)

	if (usuarioALogiarse) {
		let passwordOk = bcrypt.compareSync(req.body.password, usuarioALogiarse.password)
		if (passwordOk) {
		// ANTES DE REDIRIGIR A PERFIL, GUARDAMOS LA INFO EN SESSION (sin su password, por seguridad)
		delete usuarioALogiarse.password
		req.session.usuarioLogiado = usuarioALogiarse
   
		// RECORDAR USUARIO
		if(req.body.recordar){
			res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)} )
		}

			res.redirect('/user/perfil')
		} else{
			res.render("login", {
				error: {
					email: {
						msg: 'Su email y contraseña no coinciden'
					}
				},
        old: req.body,
        emailRecordado: req.cookies.emailRecordado,
        passwordRecordada: req.cookies.passwordRecordada
			} )
		}

	} else {
		res.render("login", {
			error: {
				email: {
					msg: 'Este email no se encuentra en nuestra base de datos'
				}
			},
      emailRecordado: req.cookies.emailRecordado,
      passwordRecordada: req.cookies.passwordRecordada
		} );
	}
  },

  register: (req, res) => res.render("register"),
  registerPost: (req, res) => {
    let errors = validationResult(req);

    if (req.file != undefined) {
      image = req.file.filename;
    } else {
      image = "userDefault.png";
    }

    // Validación si el usuario esta ingresando un correo que ya se encuentra registrado en la base de datos

    let validacionEmailExistente = usersFunctions.findAlgo("email", req.body.email);

    if (validacionEmailExistente) {
      res.render("register", { 
        errors: {          
            email: {
              msg: 'Este email ya se encuentra registrado'
            }},
        old: req.body 
      });
    }

    if (errors.isEmpty()) {
      let pass = req.body.password;
      let newUser = {
        ...req.body,
        imagen: image,
        password: bcrypt.hashSync(pass, 12),
      };
      usersFunctions.create(newUser);

      res.redirect("/user/login");
    } else {
      res.render("register", { error: errors.mapped(), old: req.body });
    }

    console.log(req.file.filename);
  },

  perfil: (req, res) => {

    res.render('perfil', {
      user: req.session.usuarioLogiado
    })
    },
  
  logout: (req, res) => { // AL CERRAR SESION Y QUERER INICIAR NUEVAMENTE, TRAE UN ERROR
    res.clearCookie('userEmail')
    req.session.destroy();
    // if (req.cookies.userZapasDesing) {
    //   res.cookie("userZapasDesing", "", { maxAge: -1 });
    // }
    res.redirect("/user/login");
  },


};

module.exports = controller;


