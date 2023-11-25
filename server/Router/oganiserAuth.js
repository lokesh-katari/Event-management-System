const { json } = require('express');
const express=require('express')
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require("../db/conn");
const app=express();
app.use(cookieParser());
const organiser=require("../model/Organiser")
// router.get('/',(req,res)=>{
//     res.send("hello from router auth,js");
// })


// /usingpromises

// router.post('/register',(req,res)=>{
    
//     //destrucring re.body data
//     const{name,email,phone,pass,Cpass}=req.body;
//     if(!name  || !email  || !phone  || !pass  || !Cpass){
//         return res.status(422).json({eroor:"plaese fill the field"});
//     }
//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({eroor:"user alredy exits"});
            
//         }
//         const user=new User( {name,email,phone,pass,Cpass});
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"});
//             console.log("user registered successfully");
//             console.log(req.body); 
//         }).catch((err)=>{
//             res.status(500).json({error:"failed to register"})
//         });
//     }).catch(err=>{console.log(err);});

    
// });
// using async and await
router.post('/register', async(req,res)=>{
    
    //destrucring re.body data
    const{name,email,phone,pass,Cpass}=req.body;
    if(!name  || !email  || !phone  || !pass  || !Cpass){
        return res.status(422).json({eroor:"plaese fill the field"});
    }
    try{
        const orgaExist = await  organiser.findOne({email:email});
        if(orgaExist){
            return res.status(422).json({eroor:"Organiser alredy exits"});
            
        }
        else if(pass != Cpass){//for checking if the password entered is matching or not
            return res.status(422).json({eroor:"password is not matching"});

        }else{

            const orga=new organiser( {name,email,phone,pass,Cpass});
            //the middleware pre for useSchema comes here ,it will implement before saving the data to datbase
             await orga.save();
            res.status(200).json({message:"user registered successfully"});          
            }
    }catch(err){
        console.log(err);
    }


    
});

//user Sign in 

router.post('/Signin', async (req,res)=>{
    let token;
   try {
    // let token;
    const{email,pass}=req.body;
    if (!email || !pass){
        return res.status(402).json({error:"invalid login"});
    }
    const userLogin =await organiser.findOne({email:email});
    
    if (userLogin){
         //comparing
         const isMatch = await bcrypt.compare(pass,userLogin.pass);
         token = await userLogin.generateAuthToken();
                console.log(token);
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+10000000),
            httpOnly:true
        })   

         if (!isMatch){
             res.status(200).json({message:"Invalid Credentials"});
            }
            else{//if the password mathes it generates a jwt token after  siging in 
                res.status(200).json({message:"user signed successfully"});
                // token = await userLogin.generateAuthToken();
                // console.log(token);
        //  console.log(userLogin);
            }
        }
        else{
            
            res.json({message:"organiser not registered "});
       
       }
    
    
   } catch (error) {
    console.log(error)
   }

})

//user adding event

module.exports=router;