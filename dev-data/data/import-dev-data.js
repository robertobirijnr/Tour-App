const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const User = require('../../models/userModel')
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

const users =JSON.parse(
    fs.readFileSync(`${__dirname}/users.json`,'utf-8'));

const importData = async () =>{
    try {
        await User.create(users,{validateBeforeSave:false});
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