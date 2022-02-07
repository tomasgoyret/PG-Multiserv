const { Citas } = require('../db.js')

// get all services

const getAllReservations = async (req, res) => {
  const { ids } = req.body
  try {
    const reservasArray = []
    for (let i = 0; i < ids.length; i++) {
      const Reservas = await Citas.findAll({
        where: { servicioId: ids[i] },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      reservasArray.push(Reservas)
    }
    res.send(reservasArray)
  } catch (error) {
    console.log(error)
  }
}

module.exports = getAllReservations
