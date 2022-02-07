
const express = require('express')
const router = express.Router()
const getAllReservations = require('../controller/reservation')

router.post('/', getAllReservations)

module.exports = router
