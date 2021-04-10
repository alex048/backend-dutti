const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validad-campos");
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getUsers);
router.post(
  "/",
  [
    check("first_name", "El Firt name es obligatorio").not().isEmpty(),
    check("last_name", "El Last name es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  postUsers
);
router.put(
  "/:id",
  [
    validarJWT,
    check("first_name", "El Firt name es obligatorio").not().isEmpty(),
    check("last_name", "El Last name es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  updateUsers
);
router.delete("/:id", validarJWT, deleteUsers);
module.exports = router;
