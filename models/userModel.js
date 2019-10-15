const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
            type:String
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
        passswordChangedAt: Date
    
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

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
  
module.exports = mongoose.model('User' ,userSchema);

  