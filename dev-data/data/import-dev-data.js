const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const Review = require('../../models/reviewModels')
dotenv.config({path:'./config.env'})

// console.log(process.env);
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    createIndexes:true
}).then(con=>{
//   console.log(con.connection)  
console.log('connection successful')
});

const reviews =JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`,'utf-8'));

const importData = async () =>{
    try {
        await Review.create(reviews,{validateBeforeSave:false});
        console.log('Data successfully loaded')
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//delete all
const deleteData = async () =>{
    try {
        await Users.deleteMany()
        console.log('Data successfuldelete');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}
console.log(process.argv);

if(process.argv[2]==='--import'){
    importData();
}else if(process.argv[2]==='--delete'){
    deleteData();
}