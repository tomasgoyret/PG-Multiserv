const { Usuarios, auth } = require("../db.js");

const putUser = async (req, res,next) => {
 const {uidClient} = req.params;
 const {name, lastName, mail, password, photoURL, phone} = req.body; 
 let newUser= false;

  try {
    const userData = {
      email: mail,
      password: password,
      displayName: `${name} ${lastName}`,
      photoURL,
      disabled: false,
    } 
    phone && (userData['phoneNumber'] = phone)

    // Update en Firebase
    var updatedUser = await auth.updateUser(uidClient, userData);
    // console.log(updatedUser, "respuesta firebase");
   
    // Update en DB
    const updatedDb= await Usuarios.update(userData,{
            where: { uidClient: uidClient }
            } );
    console.log(updatedDb)
    const usuarioActualizado= await Usuarios.findByPk(uidClient)
    console.log(usuarioActualizado)
    res.send({ msg: "Usuario Actualizado", usuarioActualizado })

  } catch (error) {
    next(error)
  }
}

module.exports = putUser;