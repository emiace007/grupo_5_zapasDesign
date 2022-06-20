let recordarUsuarioMiddleware = (req, res, next) => {
    if (req.body.recordar) {
        res.cookie("emailRecordado", req.body.email, 1000000000)
        res.cookie("passwordRecordada", req.body.password, 10000000)
    } else {
        res.cookie("emailRecordado", "", 1000000000)
        res.cookie("passwordRecordada", "", 10000000)
    }
    next()
}

module.exports = recordarUsuarioMiddleware