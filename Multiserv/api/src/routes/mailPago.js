const express = require('express')
const router = express.Router()
const postMailPago = require('../controller/mailPago')

router.post('/', postMailPago)

module.exports = router
