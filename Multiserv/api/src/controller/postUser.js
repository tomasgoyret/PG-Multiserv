const { Usuarios, auth } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postUser = async (req, res,next) => {

  const {name, lastName, mail, password, photoURL, phone} = req.body; 

  try {

    // Creacion en Firebase

    const userData = {
      email: mail,
      emailVerified: false,
      password: password,
      displayName: `${name} ${lastName}`,
      photoURL,
      disabled: false,
    } 
    phone && (userData['phoneNumber'] = phone)

    const newUser = await auth.createUser(userData)


    console.log(newUser, "respuesta firebase")



    // Creacion en DB
    
    await Usuarios.create({
      uidClient: newUser.uid,
      photoURL,
      phoneNumber: phone,
      email: newUser.email,
      displayName: `${name} ${lastName}`,
      provider: false,
      uidProvider: uuidv4(),
      disabled: false,
    })

    res.send({ msg: "Usuario Creado", user: newUser })

  } catch (error) {
    next(error)
  }
}

module.exports = postUser;