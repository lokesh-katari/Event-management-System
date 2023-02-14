const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const useSchema= new mongoose.Schema({
    name: {
        type:String,
        
   
    },
    email: {
        type:String,
   
    },
    phone: {
        type:Number,
  
     },
    pass: {
        type:String,
   
    },
    Cpass: {
        type:String,
  
    },
    Date:{
        type:Date,
        default:Date.now
    },
    messages:[{
        name:{
            type:String
        },
        email:{
            type:String
        },
        message:{
            type:String
        }



}],
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }

    ]
});
// for hashing the password
useSchema.pre("save", async function(next){
    if(this.isModified('pass')){
        this.pass= await bcrypt.hash(this.pass,12);
        this.Cpass= await bcrypt.hash(this.Cpass,12);
    }
    next();

});

useSchema.methods.generateAuthToken =async function(){//do not use arrow function cause it contains different lexical scope for this
    try {
        let token =jwt.sign({_id:this._id},'MYNAMEISLOKESHKATARIANDIAMGOODBOY');
        this.tokens =this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

useSchema.methods.addMessage=async function(name,email,phone,message,){
    try {
        this.messages=this.messages.concat({name,email,phone,message});
        await this.save();
        return this.messages;

    } catch (error) {
        console.log(error);
    }
}
const User =mongoose.model('USER',useSchema);
module.exports = User   