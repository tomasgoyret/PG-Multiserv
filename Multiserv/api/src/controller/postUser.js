const db = require("../db.js");

const postUser = async (req, res) => {
    try {
        const {nombre, apellido, correo} = req.body;
        const nuevoUsuario = {
            nombre,
            apellido,
            correo
        };
        const user = await db.collection("usuarios").add(nuevoUsuario);
        res.status(201).json({msg: "Usuario Creado", userId: user.id})
    } catch(error) {
        console.log(error);
    }
  }

  module.exports = postUser;