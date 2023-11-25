const express=require('express');
const mongoose=require('mongoose');
const app =express();
const port=8000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
mongoose.set('strictQuery', true);
const User=require('./model/useSchema')
const organiser=require('./model/Organiser')
const cors=require( 'cors');//cors can be used when there is a error for ferch is correctly working and using cors we can get rid of error like <!DocTYpe is not type of json
app.use(cors());
app.use(express.json());
require("./db/conn");
app.use('/auth',require('./Router/auth'));
app.use('/Organiser',require('./Router/oganiserAuth'));
app.use('/Event',require('./Router/evenRouting'));



app.listen(port, () => {
    console.log(`started server at port ${port}`);
  });
