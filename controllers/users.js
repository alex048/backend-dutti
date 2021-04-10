const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const users = await User.find({}, "nombre email role google");
  res.json({
    ok: true,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    const user = new User(req.body);
    //encriptar contraceña

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generarJWT(user.id);
    res.json({
      ok: true,
      user,
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

const updateUsers = async (req, res) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe el usuario",
      });
    }

    //actulizaciones
    const { password, ...campos } = req.body;

    const usuarioActulizando = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      user: usuarioActulizando,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const deleteUsers = async (req, res) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe el usuario",
      });
    }

    await User.findOneAndRemove(uid);
    res.json({
      ok: true,
      msg: "Usuario Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
};
