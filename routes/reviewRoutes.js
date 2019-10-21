const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController')

const router = express.Router({mergeParams:true});

router
.route('/')
.get(reviewController.getAllReviews)
.post(authController.protect, reviewController.setUserTourId,reviewController.createReview)

router
.route('/:id')
.get(authController.protect,reviewController.getReview)
.delete(authController.protect, reviewController.deleteReview)
.patch(authController.protect,reviewController.updateReview);






module.exports = router;