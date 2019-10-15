const express = require('express');
const bodyParser = require('body-parser'); 
const morgan = require('morgan');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//middlewares
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req,res,next)=>{
//     req.requestTime = new Date.toString();
//     next();
// });

 //routes 
app.use('/api/v1/tours',tourRouter );
app.use('/api/v1/users',userRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

//global Error Handle
app.use(globalErrorHandler);

module.exports = app;
