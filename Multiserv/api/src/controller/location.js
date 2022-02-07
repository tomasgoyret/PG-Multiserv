const { Servicios } = require('../db.js')

const getAlllocations = async (req, res, next) => {
  try {
    const ubicaciones = await Servicios.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'nameUser', 'currency', 'description', 'max', 'min', 'estadoDePago', 'rating', 'photos', 'profilePic']
      }
    })

    res.send(ubicaciones)
  } catch (error) {
    next(error)
  }
}

const updateLocation = async (req, res, next) => {
  const { id } = req.params
  const { location, address } = req.body
  try {
    const loc = await Servicios.update({
      location: location,
      address: address
    }, {
      where: { id }
    })
    res.send({ msg: 'Se agregó la ubicación correctamente', loc })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAlllocations,
  updateLocation
}
