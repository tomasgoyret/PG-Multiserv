const express = require('express')
const router = express.Router()
const {
  getAllAppointment,
  getAppointmentById,
  updateAppointments,
  deleteAppointments,
  postAppointments
} = require('../controller/appointment')

router.get('/', getAllAppointment)
router.get('/:uidClient', getAppointmentById)
router.delete('/:id', deleteAppointments)
// Se pasa id del servicio en los endpoints siguientes
router.post('/:id', postAppointments)
router.patch('/:id', updateAppointments)

module.exports = router
