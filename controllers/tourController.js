const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError')
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

 
exports.aliasTopTour=(req,res,next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,sumary,difficulty';
    next();
}


exports.getAllTours = factory.getAll(Tour)

exports.getTour = factory.getOne(Tour)

exports.createTour =factory.createOne(Tour)

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req,res,next)=>{
//      const tour = await Tour.findByIdAndDelete(req.params.id)
//      if(!tour){
//          return next(new AppError('No tour with that Id found', 404))
//      }
//         res.status(204).json({
//             status:'success',
//             data: null
            
//         })   
// })

exports.getTourStats = catchAsync(async (req,res,next) =>{
   
        const stats = await Tour.aggregate([
            {
                $match:{ratingsAverage:{$gte: 4.5}}
            },
            {
                $group:{
                    _id:null,
                    numTours:{$sum:1},
                    numRatings:{$sum:'$ratingsAuantity'},
                    avgRating:{$avg:'$ratingsAverage'},
                    avgPrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'}
                }
            }
        ]);
        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        })
   
})

exports.getMonthlyPlan = catchAsync(async(req,res,next)=>{
        const year = req.params.year* 1;
        const plan = await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month: '$startDates'},
                    numTourStarts:{$sum:1},
                    tours:{ $push:'$name'}
                }
            },
           {
            $addFields:{ month:'$_id'}
           },
           {
               $project:{
                   _id:0
               }
           },
           {
               $sort:{numTourStarts:-1}
           }
        ]);
        res.status(200).json({
            status:'success',
            data:{
                plan
            }
        })
    
})
