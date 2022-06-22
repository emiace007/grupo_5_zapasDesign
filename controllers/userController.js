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



  // login: (req, res) => {
  // 	res.render("users/login",{
  // 		session: req.session
  // 	})
  // },
  // register: (req, res) => {
  // 	res.render("/register",{
  // 		session: req.session
  // 	})
  // },


//   loginProcess: (req, res) => {
//     let errors = validationResult(req);

//     if (errors.isEmpty()) {
//       let user = users.find((user) => user.username === req.body.username);

//       req.session.user = {
//         id: user.id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//       };

//       res.locals.user = req.session.user;
//       res.redirect("/profile");
//     } else {
//       res.render("users/login", {
//         errors: errors.mapped(),
//         session: req.session,
//       });
//     }
//   },
  register: (req, res) => res.render("register"),
  registerPost: (req, res) => {
    let errors = validationResult(req);
  
    // Validación si hay un correo existente
    
    if (req.file != undefined) {
      image = req.file.filename;
    } else {
      image = "userDefault.png";
    }

    let userInDb = usersFunctions.findAlgo('email', req.body.email);
    if (userInDb){
        return res.render("register", { 
          error:{
            emailRepetido:{
              msg: "Este email ya se encuentra registrado"
            }	},
            oldData: req.body
        }
      )};

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
  logout: (req, res) => { // AL CERRAR SESION Y QUERER INICIAR NUEVAMENTE, TRAE UN ERROR
    res.clearCookie('userEmail')
    req.session.destroy();
    // if (req.cookies.userZapasDesing) {
    //   res.cookie("userZapasDesing", "", { maxAge: -1 });
    // }
    res.redirect("/user/login");
  },

  perfil: (req, res) => {

	res.render('perfil', {
		user: req.session.usuarioLogiado
	})
  },

  // DUDAS
  
  purchases: (req, res) => {
    let userProfile = users.find((user) => user.id === req.session.user.id);
    let userName = userProfile.name;

    let productPurchased = products.find(
      (productPurchased) => productPurchased.id === 9
    );

    res.render("users/purchases", {
      userProfile,
      userName,
      productPurchased,
      session: req.session,
    });
  },

};

module.exports = controller;


