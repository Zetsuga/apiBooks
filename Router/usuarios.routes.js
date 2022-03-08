const {Router} = require("express");
const usuariosCtrl = require("../Controller/usuarios.controller");

const router = Router();

router.post("/registro",usuariosCtrl.postRegistro);

router.post("/login",usuariosCtrl.postLogin)

router.put("/usuarios",usuariosCtrl.putPerfil)


module.exports = router;