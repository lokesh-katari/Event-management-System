const express=require('express');
const mongoose=require('mongoose');
const app =express();
const port=80;
mongoose.set('strictQuery', true);
const User=require('./model/useSchema')
const organiser=require('./model/Organiser')

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
