const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewModel = require('../models/reviewModels');

// router.param('id',tourController.checkID);
// router
// .route('/:tourId/review')
// .post(authController.protect,reviewController.createReview)

router.use('/tourId/reviews',reviewModel);

router
.route('/top-5-cheap')
.get(tourController.aliasTopTour,tourController.getAllTours)

router
.route('/tour-stats')
.get(tourController.getTourStats)

router
.route('/monthly-plan/:year')
.get(tourController.getMonthlyPlan)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(authController.protect,tourController.deleteTour)

// 
module.exports = router