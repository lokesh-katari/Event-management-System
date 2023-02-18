const mongoose=require('mongoose');
const events= new mongoose.Schema({
    name: {
        type:String,
  
    },
    startDate: {
        type:Date,
   
    },
    endDate: {
        type:Date,
  
     },
    email: {
        type:String,
  
     },
    mode: {
        type:String,
   
    }});


const organiserEvent =mongoose.model('organiserEvent',events);
module.exports = organiserEvent