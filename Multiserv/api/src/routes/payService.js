const express = require('express')
const router = express.Router()
const payService = require('../controller/payService')

router.post('/', payService.pago)

module.exports = router
