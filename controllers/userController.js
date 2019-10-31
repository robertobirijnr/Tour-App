const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp')

// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//       cb(null,'public/img/users'); 
//     },
//     filename:(req,file,cb)=>{
//         const ext = file.mimetype.split('/')[1];
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// });

const multerStorage = multer.memoryStorage()

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image please upload only images',400),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto =(req,res,next)=>{
    if(!req.file) return next();
    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/users/`)
}

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
    if(req.file) filteredBody.photo = req.file.filename;
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