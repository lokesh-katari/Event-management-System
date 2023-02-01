const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const organiserSchema= new mongoose.Schema({
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
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }

    ],
    events:{
        type:String
    }
});
// for hashing the password
organiserSchema.pre("save", async function(next){
    if(this.isModified('pass')){
        this.pass= await bcrypt.hash(this.pass,12);
        this.Cpass= await bcrypt.hash(this.Cpass,12);

    }
    next();

});

organiserSchema.methods.generateAuthToken =async function(){
    try {
        let token =jwt.sign({_id:this._id},'MYNAMEISLOKESHKATARIANDIAMGOODBOY');
        this.tokens =this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}
const organiser =mongoose.model('organiser',organiserSchema);
module.exports = organiser