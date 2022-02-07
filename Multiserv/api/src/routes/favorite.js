const express = require('express')
const router = express.Router()
const { postFavorite, getAllUserFavorites, deleteFavorite } = require('../controller/favorite')

router.get('/:uidClient', getAllUserFavorites)
router.post('/', postFavorite)
router.delete('/', deleteFavorite)

module.exports = router
