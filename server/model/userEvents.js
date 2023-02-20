const mongoose=require('mongoose');
const userEvents= new mongoose.Schema({
    email:{
        type:String
    },
    registeredEvents:[{
        registeredEvent:{
            type:String
        },
        startDate:{type:String}
    }]
})
const  events =mongoose.model('userEvents',userEvents);
 module.exports = organiser