const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug:{
        type:String
    },
    duration:{
        type:Number,
        required:true
    },
    maxGroupSize:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
        enum:['easy','medium','difficult']
    },
    ratingsAverage:{
        type:Number,
        default:6.0
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
     type:Number,
     required:true
    },
    priceDiscount:{
        type:Number
    },
    summary:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
       type:String,
       required:true 
    },
    image:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates:[Date]
 },{
     toJSON:{virtuals:true},
     toObject:{virtuals:true},
 });

 tourSchema.virtual('durationweeks').get(function(){
     return this.duration / 7;
 });
 tourSchema.pre('save',function(){
    this.slug = slugify(this.name,{lower:true});
    next();
 });
//  tourSchema.post('save',function(doc,next){

//  })

 const Tour = mongoose.model('Tour',tourSchema);
 module.exports = Tour;