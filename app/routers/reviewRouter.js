const express = require('express')
const reviewRouter = express.Router()
const { protectRoute, isAuthorised } = require('../controller/authController')
const { getAllReviews, top3Reviews, getPlanReview, createReview, updateReview, deleteReview } = require('../controller/reviewController')

reviewRouter.route('/all')
.get(getAllReviews)

reviewRouter.route('/top3')
.get(top3Reviews)

reviewRouter.route('/:id')
.get(getPlanReview)

reviewRouter.use(protectRoute);
reviewRouter.route('/curd/:plan')
.post(createReview)

reviewRouter.route('/curd/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports = reviewRouter

