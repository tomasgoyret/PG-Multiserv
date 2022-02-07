const { Favoritos, Usuarios, Servicios } = require('../db.js')
const { v4: uuidv4 } = require('uuid')

const deleteFavorite = async (req, res) => {
  const { id, uidClient } = req.query
  console.log(id, uidClient)
  try {
    const eliminado = await Favoritos.destroy({
      where: { id }
    })
    const newLista = await Favoritos.findAll({
      usuarios_favoritos: { where: { usuarioUidClient: uidClient } },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    eliminado === 1 ? res.send(newLista) : res.send('No se encontro favorito')
  } catch (error) {
    console.log(error)
  }
}

const getAllUserFavorites = async (req, res) => {
  const { uidClient } = req.params

  try {
    const favoritos = await Favoritos.findAll({
      usuarios_favoritos: { where: { usuarioUidClient: uidClient } },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    favoritos.length === 0 ? res.send('No hay favoritos') : res.send(favoritos)
  } catch (error) {
    console.log(error)
  }
}

const postFavorite = async (req, res) => {
  const { uidClient, idService } = req.body

  try {
    // Corroboro si el favorito existe en ese Usuario

    const usuario = await Usuarios.findOne({
      where: { uidClient: uidClient },
      include: {
        model: Favoritos,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        through: {
          attributes: []
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    if (usuario.favoritos?.some(f => f.idService === idService)) {
      const fav = usuario.favoritos?.filter(f => f.idService === idService)
      res.send({ msg: 'Favorito ya agregado', id: fav.id })
    }

    // Sino, creo el Favorito para Usuario
    else {
      const servicio = await Servicios.findOne({ where: { id: idService } })
      const title = servicio.title
      const photos = servicio.photos
      const newFav = await Favoritos.create({
        id: uuidv4(),
        idService,
        title,
        photos
      })
      await newFav.addUsuarios(uidClient)
      res.send(newFav)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllUserFavorites,
  postFavorite,
  deleteFavorite
}
