const express = require('express')
const router = express.Router()
const { getAllReviews, getReviewsById, deleteReview, postReview } = require('../controller/review')

router.get('/', getAllReviews)
router.get('/:id', getReviewsById)
router.post('/:id', postReview)
router.delete('/:id', deleteReview)

module.exports = router
