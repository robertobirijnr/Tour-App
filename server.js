const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose.connect(process.env.DATABASE_LOCAL,{
    createIndexes:false,
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
   
}).then(con=>{
//   console.log(con.connection)  
console.log('connection successful')
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`App runing on port ${port}`)
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  