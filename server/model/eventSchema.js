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
    mode: {
        type:String,
   
    },
    venue: {
        type:String,
  
     }
     ,category:{
        
     }
    // category:[
    //     {
    //     Workshop:{
    //         type:String 
    //     },
    //     Fest:{
    //         type:String 
    //     },
    //     Meet:{
    //         type:String  
    //     },
    //     Quiz:{
    //         type:String
    //     }
    // }

    // ],

});


const organiserEvent =mongoose.model('organiserEvent',events);
module.exports = organiserEvent