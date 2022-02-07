const { Favoritos, Servicios } = require('../db.js')

const deleteFavorite = async (req, res) => {
  const { id } = req.query
  const del = await Favoritos.destroy({ where: { id } })
  del
    ? res.status(200).json('Servicio eliminado de favoritos correctamente')
    : res.status(400).json('No se encontro favorito')
}

const getAllUserFavorites = async (req, res) => {
  const { uidClient } = req.params
  const favoritos = await Favoritos.findAll({
    where: { usuarioUidClient: uidClient },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  !favoritos.length
    ? res.status(400).json('No hay favoritos')
    : res.status(200).json(favoritos)
}

const postFavorite = async (req, res) => {
  const { uidClient, idService } = req.body
  const favorite = await Favoritos.findOne({ where: { usuarioUidClient: uidClient, idService } })
  if (!favorite) {
    const service = await Servicios.findOne({ where: { id: idService } })
    const [newFavorite, created] = await Favoritos.findOrCreate({
      where: { usuarioUidClient: uidClient, idService },
      defaults: { idService, title: service.title, photos: service.photos }
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
