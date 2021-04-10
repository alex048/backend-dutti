const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validad-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/",
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  login
);
router.get("/renew", validarJWT, renewToken);

module.exports = router;
