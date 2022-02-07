const { Favoritos, Usuarios, Servicios } = require('../db.js')

const deleteFavorite = async (req, res) => {
  const { id, uidClient } = req.query
  const del = await Favoritos.destroy({
    where: { id }
  })
  const newList = await Favoritos.findAll({
    usuarios_favoritos: { where: { usuarioUidClient: uidClient } },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  del ? res.status(200).json(newList) : res.status(400).json('No se encontro favorito')
}

const getAllUserFavorites = async (req, res) => {
  const { uidClient } = req.params
  const favoritos = await Favoritos.findAll({
    usuarios_favoritos: { where: { usuarioUidClient: uidClient } },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  !favoritos.length
    ? res.status(400).json('No hay favoritos')
    : res.status(200).json(favoritos)
}

const postFavorite = async (req, res) => {
  const { uidClient, idService } = req.body
  const favorite = await Favoritos.findOne({ where: { usuarioUidClient: uidClient, idService } })
  if (favorite.length <= 0) {
    const service = await Servicios.findOne({ where: { id: idService } })
    console.log(service.title)
    const title = service.title
    const photos = service.photos
    const [newFavorite, created] = await Favoritos.findOrCreate({
      where: {
        usuarioUidClient: uidClient,
        idService
      },
      defaults: {
        idService,
        title,
        photos
      }
    })
    res.status(200).json(newFavorite)
  }
  res.status(400).json({ msg: 'Servicio ya agregado como favorito' })
}

module.exports = {
  getAllUserFavorites,
  postFavorite,
  deleteFavorite
}
