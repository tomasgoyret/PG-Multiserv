const { Usuarios, auth } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postUser = async (req, res,next) => {

  const {name, lastName, mail, password, photoURL, phone, isGoogle, uid, isAdmin} = req.body; 
 let newUser= false;

  try {

    // Creacion en Firebase
    if(!isGoogle) {
    const userData = {
      email: mail,
      emailVerified: false,
      password: password,
      displayName: `${name} ${lastName}`,
      photoURL,
      disabled: false,
    } 
    phone && (userData['phoneNumber'] = phone)

    newUser = await auth.createUser(userData)


    console.log(newUser, "respuesta firebase")
  } 
    // Creacion en DB
   
    const [NuevoUsuario, created]= await Usuarios.findOrCreate({
      where: {
        email: mail,
      },
      defaults: {
        uidClient: newUser ? newUser.uid : uid,
        photoURL,
        phoneNumber: phone,
        isAdmin,
        displayName: `${name} ${lastName}`,
        provider: false,
        uidProvider: uuidv4(),
        disabled: false,
      }
    }) 
    res.send({ msg: "Usuario Creado", user: newUser })

  } catch (error) {
    next(error)
  }
}

module.exports = postUser;