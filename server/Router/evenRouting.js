const { json } = require('express');
const express=require('express')
const router = express.Router();
require("../db/conn");
const events=require("../model/eventSchema");
router.post('/event', (req,res)=>{
    const{name,startDate,endDate,mode,venue}=req.body;
    if (!name || !startDate || !endDate || !mode || !venue ){
        return res.status(422).json({error:"plaese fill the field"});
    }
    const event1=new events(req.body);
    event1.save();
    res.status(201).json({message:"event added successfully"});          

})

module.exports=router;