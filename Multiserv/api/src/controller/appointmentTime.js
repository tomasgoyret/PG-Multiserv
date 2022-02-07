const { Horarios, Servicios } = require('../db.js')

const getAllppointmentsTimes = async (req, res) => {
  const { id } = req.params
  try {
    const servicio = await Servicios.findByPk(id, { include: [Horarios] })
    res.send(servicio.horarios)
  } catch (error) {
    console.log(error)
  }
}
const postAppointmentTime = async (req, res) => {
  const { idService } = req.params
  const { fechas, uidClient } = req.body
  try {
    const servicio = await Servicios.findByPk(idService)
    if (servicio.usuarioUidClient === uidClient) {
      const horariosCreado = await Horarios.findOne({ where: { id: idService } })
      if (horariosCreado !== null) {
        Horarios.update({ id: idService, fechas: fechas }, { where: { id: idService } })
        res.send('Horarios actualizados')
      } else {
        const horario = await Horarios.create({ fechas: fechas, id: idService })
        await servicio.addHorarios(horario)
        res.send(`agregado correctamente al servicio ${servicio.title}, con id: ${idService}`)
      }
    } else {
      res.send('Usuario incorrecto para creacion de servicio')
    }
  } catch (error) {
    console.log(error)
  }
}

const updateAppointmentTime = async (req, res) => {
  const { id } = req.params
  const { fechas } = req.body
  try {
    await Horarios.update(fechas, { where: id })
    res.send('Horario editado correctamente')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllppointmentsTimes,
  postAppointmentTime,
  updateAppointmentTime
}
