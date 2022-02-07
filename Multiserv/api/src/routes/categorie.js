const express = require('express')
const router = express.Router()
const { getAllCategories, updateCategorie, deleteCategorie, postCategorie } = require('../controller/categorie')

router.get('/', getAllCategories)
router.patch('/', updateCategorie)
router.delete('/:id', deleteCategorie)
router.post('/', postCategorie)

module.exports = router
