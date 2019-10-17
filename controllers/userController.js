const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const filterObj = (obj,...allowedField)=>{
    const newObj = {}
   Object.keys(obj).forEach(el=>{
       if(allowedField.includes(el)) newObj[el]=obj[el];
   })
   return newObj; 
}

exports.getAllUsers = catchAsync(async(req,res,next)=>{
    const users = await User.find();
    //send responds
    res.status(200).json({
        status:'sucess',
        result:users.length,
        data:{
            tours: users
        }
    })
})

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

exports.getUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}
exports.createUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}

exports.updateUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet defined'
    })
}