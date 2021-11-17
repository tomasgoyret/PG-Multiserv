const { Usuarios, auth } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postUser = async (req, res) => {

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

    console.log(newUser,'asdasd')
    // Creacion en DB
    
    const a = await Usuarios.create({
      uidClient: newUser.UserRecord.uid,
      photoURL,
      phoneNumber: phone,
      email: newUser.UserRecord.email,
      displayName: `${name} ${lastName}`,
      provider: false,
      uidProvider: uuidv4(),
      disabled: false,
    }) 

    console.log(a,'DB')

    // Creacion en DB
    res.send({ msg: "Usuario Creado", user: newUser })

  } catch (error) {
    res.send(error)
  }
}

module.exports = postUser;