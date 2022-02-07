const express = require('express')
const router = express.Router()
const { getAlllocations, updateLocation } = require('../controller/location')

router.get('/', getAlllocations)
router.patch('/:id', updateLocation)

module.exports = router
