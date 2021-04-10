const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (rep, res = response) => {
  const { email, password } = rep.body;

  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no Valida",
      });
    }

    //verficar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no Valida",
      });
    }
    //generar el token
    const token = await generarJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};
const renewToken = async (rep, res = response) => {
  const uid = rep.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT(uid);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
