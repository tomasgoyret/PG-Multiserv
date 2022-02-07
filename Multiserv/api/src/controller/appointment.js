const { Citas, Usuarios, Servicios, Horarios } = require('../db.js')
const { sendEmail, mailTurno, mailTurnoProveedor } = require('../mails/mails.js')

const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Citas.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.send(appointments)
  } catch (error) {
    console.log(error)
  }
}

const getAppointmentById = async (req, res) => {
  const { uidClient } = req.params
  try {
    const appointments = await Citas.findAll({
      where: { usuarioUidClient: uidClient },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.send(appointments)
  } catch (error) {
    console.log(error)
  }
}

const postAppointments = async (req, res, next) => {
  const { id } = req.params
  const { dia, hora, uidClient, direccion, ciudad } = req.body
  try {
    let subject = ''
    const user = await Usuarios.findByPk(uidClient)
    const service = await Servicios.findByPk(id, { include: [Horarios] })
    const appointmentTime = await Horarios.findByPk(id)
    const appointment = { dia, hora, nameUser: user.displayName, direccion, ciudad, title: service.title }
    const appointments = await Citas.create(appointment)
    await user.addCitas(appointments)
    await service.addCitas(appointments)
    await Horarios.update({
      fechas: appointmentTime.fechas.map((e) => {
        if (e[dia]) {
          e[dia].map((h) => {
            if (h.hora === hora.hora) {
              h.reservado = true
              return h
            } else {
              return h
            }
          })
          return e
        } else { return e }
      })
    }, {
      where: { id }
    })

    const template = await mailTurno(user.displayName, dia, hora.hora, direccion, ciudad, service.title)
    await sendEmail(user.email, subject = ' Confirmación de turno ', template)
    const proveedor = await Usuarios.findByPk(service.usuarioUidClient)
    const templateProveedor = await mailTurnoProveedor(proveedor.displayName, user.displayName, dia, hora.hora, direccion, ciudad, service.title)
    await sendEmail(proveedor.email, subject = 'Agendaron un turno contigo', templateProveedor)
    res.send(`Turno reservado para el dia : ${dia}, hora : ${hora.hora}, servicio : ${service.title}`)
  } catch (error) {
    next(error)
  }
}

const updateAppointments = async (req, res, next) => {
  const { id } = req.params
  try {
    const appointments = await Citas.update(
      { status: 'Concretada' },
      { where: { id: id } }
    )
    res.send(appointments)
  } catch (error) {
    next(error)
  }
}

const deleteAppointments = async (req, res) => {
  const { id } = req.params
  try {
    const appointment = await Citas.destroy({ where: { id } })
    appointment !== 1 ? res.send('No hay citas que coincidan') : res.send('Cita borrada correctamente')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllAppointment,
  getAppointmentById,
  updateAppointments,
  deleteAppointments,
  postAppointments
}
