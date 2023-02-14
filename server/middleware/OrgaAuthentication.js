
const jwt=require('jsonwebtoken');
const organiser=require("../model/Organiser");

const OrgaAuthentication=async (req,res,next)=>{
  
    
    try{
        
        // console.log(token);
        const token=req.cookies.jwtoken;
        console.log(`this is my ${token}`);
        const verifyToken =jwt.verify(token,'MYNAMEISLOKESHKATARIANDIAMGOODBOY');
        const rootUser=await organiser.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('user not fdound');
        }
        req.token=token;
         req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }catch(err){
        res.status(401).send("Unauthorised:no token provided");
        console.log(err);
    }

}
module.exports=OrgaAuthentication;