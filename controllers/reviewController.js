const Review = require('../models/reviewModels');
const factory = require('./handlerFactory')


exports.setUserTourId =(req,res,next)=>{
    //Allow nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.params.id;
    next();
}
exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review)
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview =factory.updateOne(Review);