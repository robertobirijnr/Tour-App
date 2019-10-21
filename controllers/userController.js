const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory')

const filterObj = (obj,...allowedField)=>{
    const newObj = {}
   Object.keys(obj).forEach(el=>{
       if(allowedField.includes(el)) newObj[el]=obj[el];
   })
   return newObj; 
}


exports.updateMe =catchAsync(async(req,res,next)=>{
    if(req.body.password|| req.body.passwordConfirm){
        return next(new AppError('You can change password here ',400))
    }

    const filteredBody = filterObj(req.body,'name','email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    })
});

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})
    
    res.status(204).json({
        status:'sucess',
        data:null
    })
})


exports.createUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}

exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);