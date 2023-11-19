const express = require('express')
const reviewRouter = express.Router()
const { protectRoute, isAuthorised } = require('../controller/authController')

reviewRouter.route('/all')
.get(getAllReviews)

reviewRouter.route('/top3')
.get(top3Reviews)

reviewRouter.route('/:id')
.get(getPlanReview)

reviewRouter.use(protectRoute);
reviewRouter.route('/curd')
.post(createReview)

reviewRouter.route('/curd/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports = reviewRouter

