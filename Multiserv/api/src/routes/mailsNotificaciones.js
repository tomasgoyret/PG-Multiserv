const express = require('express')
const router = express.Router()
const { notificaciones } = require('../mails/mailsNotificaciones')

router.get('/', notificaciones)

module.exports = router
