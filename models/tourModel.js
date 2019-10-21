const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel')


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
    guides:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    startLocation:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    locations:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String,
        day:Number
    },
    startDates:[Date]
   },
   {
     toJSON:{virtuals:true},
     toObject:{virtuals:true},
 }
 );

 tourSchema.index({price:1,ratingsAverage:-1});
 tourSchema.index({slug:1})

//  tourSchema.pre(/^find/,function(next){
//      this.populate({
//         path:'guides',
//         select:'-__v -passwordChangedAt'
//     })
//  })

 tourSchema.virtual('durationweeks').get(function(){
     return this.duration / 7;
 });
 tourSchema.pre('save',function(){
    this.slug = slugify(this.name,{lower:true});
    next();
 });

//  tourSchema.post('save',async function(next){
//     const guidesPromises = this.guides.map(async id=> await User.findById(id));
//     this.guides = await Promise.all(guidesPromises);
//     next();
//  })

 const Tour = mongoose.model('Tour',tourSchema);
 module.exports = Tour; 