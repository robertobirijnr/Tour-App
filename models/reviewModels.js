const mongoose = require('mongoose');
const Tour = require('./tourModel')


const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
 
 },
  {
     toJSON:{virtuals:true},
     toObject:{virtuals:true},
 })

 reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'tour',
        select:'name'
    }).populate({
        path:'user',
        select:'name photo'
    })
    next();
 });


 reviewSchema.statics.calcAverageRating = async function(tourId){
    const stats = await this.aggregate([
         {
             $match:{tour:tourId}
         },{
            $group:{
                _id:'$tour',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'}
            }
         }
         
     ])
    //  console.log(stats);
     if(stats.length > 0){
        await Tour.findByIdAndUpdate(tourId,{
            ratingsAverage:stats[0],nRating,
            ratingsQuantity:[0].avgRating 
         })
     }else{
        await Tour.findByIdAndUpdate(tourId,{
            ratingsAverage:0,
            ratingsQuantity:4.5
         })
     }
    
 }

 reviewSchema.post('save',function(next){
   this.constructor.calcAverageRating(this.tour);
 })

 reviewSchema.pre(/^findOneAnd/,async function(next){
     this.r = await this.findOne();
    //  console.log(this.r);
     next();
 });

 reviewSchema.post(/^findOneAnd/,async function(){
    await this.r.constructor.calcAverageRating(this.r.tour)
 })

 const Review = mongoose.model('Review',reviewSchema);
 module.exports = Review; 