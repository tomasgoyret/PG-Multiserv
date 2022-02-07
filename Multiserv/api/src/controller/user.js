const { Usuarios, auth, Servicios } = require('../db.js')
const { v4: uuidv4 } = require('uuid')

const getAllUsers = async (req, res) => {
  try {
    const dbUsuarios = await Usuarios.findAll({
      include: {
        model: Servicios,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.status(200).json(dbUsuarios)
  } catch (err) {
    console.log(err)
  }
}

const getUserById = async (req, res) => {
  try {
    const { uidClient } = req.params

    const dbUsuario = await Usuarios.findOne({
      where: { uidClient },
      include: {
        model: Servicios,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    dbUsuario
      ? res.send(dbUsuario)
      : res.send('El usuario no existe en la base de datos')
  } catch (error) {
    res.status(404).json({ msg: 'El usuario no existe en la base de datos' })
  }
}

const postUser = async (req, res, next) => {
  const { name, lastName, mail, password, photoURL, phone, isGoogle, uid, isAdmin } = req.body
  let newUser = false
  console.log('Este es el uid: ', uid)
  try {
    // Creacion en Firebase
    if (!isGoogle) {
      const userData = {
        email: mail,
        emailVerified: false,
        password: password,
        displayName: `${name} ${lastName}`,
        photoURL,
        disabled: false
      }
      phone && (userData.phoneNumber = phone)

      newUser = await auth.createUser(userData)
    }
    // Creacion en DB
    const [NuevoUsuario, created] = await Usuarios.findOrCreate({
      where: {
        email: mail
      },
      defaults: {
        uidClient: newUser ? newUser.uid : uid,
        photoURL,
        phoneNumber: phone,
        isAdmin,
        displayName: `${name} ${lastName}`,
        provider: false,
        uidProvider: uuidv4(),
        disabled: false
      }
    })
    res.send(newUser)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  const { uidClient } = req.params
  const { name, lastName, mail, password, photoURL, phone, isAdmin, disabled } = req.body
  try {
    const userData = {
      email: mail,
      password: password,
      displayName: `${name} ${lastName}`,
      photoURL,
      disabled,
      isAdmin
    }
    phone && (userData.phoneNumber = phone)

    // Update en Firebase
    await auth.updateUser(uidClient, userData)
    // console.log(updatedUser, "respuesta firebase");

    // Update en DB
    await Usuarios.update(userData, {
      where: { uidClient: uidClient }
    })
    const usuarioActualizado = await Usuarios.findByPk(uidClient)
    res.send({ msg: 'Usuario Actualizado', usuarioActualizado })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const { uidClient } = req.params
  try {
    // Elimina usuario de Firebase
    await auth.deleteUser(uidClient)
      .then()
    // Elimina usuario de DB
    const user = await Usuarios.destroy({ where: { uidClient: uidClient } })
    user === 1 ? res.json({ msg: 'El usuario se borró correctamente' }) : res.json({ msg: 'El usuario que intenta eliminar no existe' })
    user === 1 ? res.json({ msg: 'El usuario se borró correctamente' }) : res.json({ msg: 'El usuario que intenta eliminar no existe' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
}
