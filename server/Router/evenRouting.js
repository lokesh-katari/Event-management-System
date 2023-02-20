const { json } = require('express');
const express=require('express')
const router = express.Router();
require("../db/conn");
const Oevents=require("../model/eventSchema");

require("../model/eventSchema");
 const OrgaAuthentication = require("../middleware/OrgaAuthentication")
router.post('/addEvent', (req,res)=>{
    const{name,startDate,endDate,mode,email}=req.body;
    if (!name || !startDate || !endDate || !mode || !email ){
        return res.status(422).json({eror:"plaese fill the field"});
    }
    const event1=new Oevents(req.body);
    event1.save();
    res.status(201).json({message:"event added successfully"});          

})
router.get('/getEvent',OrgaAuthentication,async(req,res)=>{
   console.log(req.rootUser.email);
   const listOfEvents=await Oevents.find({email:req.rootUser.email})
   let date =Date.now

   
   console.log(listOfEvents);
   res.send(listOfEvents);

})

module.exports=router;