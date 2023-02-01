const mongoose=require('mongoose');
// const DB= "mongodb://localhost:27017/lokesh";

// mongoose.connect(DB,{
//     // useNewUrlParser:true,
//     // useCreateIndex:true,
//     // useUnifiedTopology:true,
//     // useFindAndModify:false
   
// }).then(()=>{
//     console.log("connection succesfull");
// }).catch((err)=>{
//     console.log(err);
// })
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/lokesh',{useNewUrlParser:true}).then(()=>{
         console.log("connection succesfull");
     }).catch((err)=>{
         console.log(err);
    });