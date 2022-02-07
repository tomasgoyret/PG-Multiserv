const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, postUser, deleteUser, updateUser } = require('../controller/user')

router.get('/', getAllUsers)
router.get('/:uidClient', getUserById)
router.post('/', postUser)
router.patch('/:uidClient', updateUser)
router.delete('/:uidClient', deleteUser)

module.exports = router
