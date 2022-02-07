const express = require('express')
const router = express.Router()
const {
  getAllServices,
  getServiceId,
  getUserService,
  updateService,
  deleteService,
  postService
} = require('../controller/service')

router.get('/', getAllServices)
router.get('/:id', getServiceId)
router.get('/:uidClient', getUserService)
router.patch('/:id', updateService)
router.post('/', postService)
router.delete('/:id', deleteService)

module.exports = router
