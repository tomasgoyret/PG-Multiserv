const { Usuarios } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postUser = async (req, res) => {
  const { name, lastName, photoURL, phone, uid } = req.body;
  try {
    const newUser = await Usuarios.create({
      uidClient: uid,
      photoURL,
      phoneNumber: phone,
      displayName: `${name} ${lastName}`,
      provider: false,
      uidProvider: uuidv4(),
      disabled: false,
    })
    res.send({ msg: "Usuario Creado", user: newUser })
  } catch (error) {
    res.send(error)
  }
}

module.exports = postUser;