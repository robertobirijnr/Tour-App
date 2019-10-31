const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        },
        photo:{
            type:String,
            default:'default.jpg'
        },
        role:{
            type:String,
            enum:['user','admin','guide','lead-guide'],
            default:'user'
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        passwordConfirm:{
            type:String,
            required:String,
            validate:{
                validator:function(el){
                        return el === this.password;
                    },
                    message:'passwords are not the same '
                
            }
        },
        passswordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active:{
            type:Boolean,
            default:true,
            select:false
        }
    
});

//password hashing...
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

//password validation...
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}


userSchema.pre('save',function(next){
    if (this.isModified('password')|| this.isNew) return next();

    this.passwordChangedAt = Date.now()-1000;
    next();
})

//midleware to filter search users
userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}});
    next();
 })
 

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
};


//midleware to check password reset token
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  
module.exports = mongoose.model('User' ,userSchema);

  