const express = require('express')
const router = express.Router()
const { getAllppointmentsTimes, updateAppointmentTime, postAppointmentTime } = require('../controller/appointmentTime')

// id del servicio
router.get('/:id', getAllppointmentsTimes)
router.patch('/:id', updateAppointmentTime)
router.post('/:idService', postAppointmentTime)

module.exports = router
