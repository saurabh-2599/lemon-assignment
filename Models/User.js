const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"user must have some name"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
//encrypting password before saving it into the database;
userSchema.pre('save',async function(next){
   this.password=await bcrypt.hash(this.password,10);
   next();
})
//checking if password is matched or not using mongoose instance methods
userSchema.methods.checkPassword=async function(userPassword,dbPassword){
    const matchPassword=await bcrypt.compare(userPassword,dbPassword);
    if(!matchPassword){
        return false;
    }
    return true;
}
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;