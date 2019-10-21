const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async (req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc){
        return next(new AppError('No document with that Id found', 404))
    }
       res.status(204).json({
           status:'success',
           data: null
           
       })   
})

exports.updateOne = Model =>catchAsync(async (req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators: true
     })
     if(!doc){
         return next(new AppError('No document with that Id found',404))
     }
         res.status(200).json({
             status:'success',
             data:{
                 data:doc
             }
         })
    
 });

 exports.createOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.create(req.body)
    res.status(200).json({
        status:'success',
        data:{
            data: doc
        }
    }) 
});

exports.getOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findById(req.params.id)
        if(!doc){
            return next( new AppError('No document with that Id found',404))
        }
       
        res.status(200).json({
            status:'sucess',
            data:{
                data: doc
            }
        }) 
});

exports.getAll = Model => catchAsync(async(req,res,next)=>{
    //Execute Query
    const features = new APIFeatures(Model.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    const doc = await features.query;
    //send responds
    res.status(200).json({
        status:'sucess',
        result:doc.length,
        data:{
            data:doc
        }
    })
})