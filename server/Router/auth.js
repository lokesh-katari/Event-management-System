const { json } = require('express');
const express=require('express');
const app =express();

const router = express.Router();
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const authenticate=require("../middleware/authenticate");
const OrgaAuthentication=require("../middleware/OrgaAuthentication");
require("../db/conn");
const User=require("../model/useSchema")
router.get('/',(req,res)=>{
    res.send("hello from router auth,js");
})


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
router.post('auth/register', async(req,res)=>{
    
    //destrucring re.body data
    const{name,email,phone,pass,Cpass}=req.body;
    if(!name  || !email  || !phone  || !pass  || !Cpass){
        return res.status(422).json({error:"plaese fill the field"});
    }
    try{
        const userExist = await  User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"user alredy exits"});
            
        }
        else if(pass != Cpass){//for checking if the password entered is matching or not
            return res.status(422).json({error:"password is not matching"});

        }else{

            const user=new User( {name,email,phone,pass,Cpass});
            //the middleware pre for useSchema comes here ,it will implement before saving the data to datbase
             await user.save();
            res.status(200).json({message:"user registered successfully"});          
              
        }
    }catch(err){
        console.log(err);  
    }


    
});

//user Sign in 

router.post('auth/login', async (req,res)=>{
   
   try {
    let token;
    const{email,pass}=req.body;
    if (!email || !pass){
        return res.status(402).json({error:"invalid login"});
    }
    const userLogin =await User.findOne({email:email});
    
    if (userLogin){
         //comparing
         const isMatch = await bcrypt.compare(pass,userLogin.pass);
         token = await userLogin.generateAuthToken();
                console.log(token);
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+10000000),
            httpOnly:true
        });
        

         if (!isMatch){
             res.status(402).json({message:"Invalid Credentials"});
            }
            else{//if the password mathes it generates a jwt token after  siging in 
                res.status(200).json({message:"user signed successfully"});
                // token = await userLogin.generateAuthToken();
                // console.log(token);
        //  console.log(userLogin);
            }
        }
        else{
            
            res.json({message:"user not registered "});
       
       }
    
    
   } catch (error) {
    console.log(error)
   }

});


//fro getting the about data the user
router.get("/about",OrgaAuthentication,(req,res)=>{//authrnticate is a middleware used to authenticate the datailsof the user by token and cookeies
    console.log("about page");
    
    res.send(req.rootUser);
});

//for a
// router.get("/addEvent",authenticate,(req,res)=>{
//     console.log("about page");
    
//     res.send(req.rootUser);  
// })
//for submitting the cotact form too the db using post request
router.post("/contactSub",authenticate, async (req,res)=>{
    try {
        const{name,email,phone,message}=req.body;
        if(!name || !email || !phone || !message){
            console.log("err in contact from");
            return res.json({error:"plz fill the contact form"});
        }
        else{
        const userContact=await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage=await userContact.addMessage(name,email,phone,message);
            // await userMessage.save();
res.status(201).send({message:"contact  from saved"})
        }
        }
    } catch (error) { 
        console.log(error);
        console.log("error in conatact page");
    }
});

module.exports=router;