const { Servicios, Resenas, Usuarios } = require('../db')

const getAllReviews = async (req, res) => {
  try {
    const resenas = await Resenas.findAll()
    res.status(200).json(resenas)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getReviewsById = async (req, res) => {
  const { id } = req.params
  try {
    const resenas = await Resenas.findAll({ where: { servicioId: id } })
    if (resenas.length > 0) {
      const rating = resenas.map(r => r.rating)
      const suma = rating.reduce((a, b) => a + b, 0)
      const promedio = suma / rating.length
      await Servicios.update({ rating: promedio.toFixed(1) }, { where: { id } })
    }
    res.status(200).json(resenas)
  } catch (error) {
    res.status(400).json('No funciona')
  }
}

const deleteReview = async (req, res) => {
  const id = req.params
  const resena = await Resenas.destroy({ where: id })
  resena
    ? res.json({ msg: 'La reseña se borró correctamente' })
    : res.json({ msg: 'La reseña que intenta eliminar no existe' })
}

const postReview = async (req, res) => {
  const { id } = req.params
  const { title, details, rating, uidClient } = req.body
  try {
    const [resena, created] = await Resenas.findOrCreate({
      where: { usuarioUidClient: uidClient, servicioId: id },
      defaults: {
        title,
        details,
        rating,
        usuarioUidClient: uidClient,
        servicioId: id
      }
    })
    res.status(200).json({ msg: 'La reseña se creo correctamente', resena })
    if (!created) return res.status(404).json({ msg: 'Solo puede hacer una reseña por servicio' })
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  getAllReviews,
  getReviewsById,
  deleteReview,
  postReview
}
