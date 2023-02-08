const express=require('express');
const mongoose=require('mongoose');
const app =express();
const port=8000;
mongoose.set('strictQuery', true);
const User=require('./model/useSchema')
const organiser=require('./model/Organiser')
const cors=require( 'cors');//cors can be used when there is a error for ferch is correctly working and using cors we can get rid of error like <!DocTYpe is not type of json
app.use(cors());
app.use(express.json());
require("./db/conn");
app.use(require('./Router/auth'));
app.use(require('./Router/oganiserAuth'));
app.use(require('./Router/evenRouting'));

app.get('/',(req,res)=>{
    res.end('home ')
});
app.listen(port, () => {
    console.log(`started server at port ${port}`);
  });
