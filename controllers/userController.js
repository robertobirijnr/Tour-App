const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

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