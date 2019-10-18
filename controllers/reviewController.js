const Review = require('../models/reviewModels');
const catchAasync = require('../utils/catchAsync');

exports.getAllReviews = catchAasync(async(req,res,next)=>{
    const review = await Review.find();

    res.status(200).json({
        status:'success',
        data:{
            review
        }
    })
});


exports.createReview = catchAasync(async(req,res,next)=>{
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            review: newReview
        }
    })
})