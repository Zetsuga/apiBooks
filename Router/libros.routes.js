const {Router} = require("express");
const librosCtrl = require("../Controller//libros.controller");

const router = Router();

router.get("/libros",librosCtrl.getLibros);
router.post("/libros",librosCtrl.postLibros);
router.put("/libros",librosCtrl.putLibros);
router.delete("/libros",librosCtrl.delLibros);


module.exports = router;