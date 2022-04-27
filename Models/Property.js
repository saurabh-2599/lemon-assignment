const mongoose=require("mongoose");
const propertySchema=new mongoose.Schema({
    propertyName:{
        type:String,
        required:true,
    },
    listedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
      type:{
          type:String,
          default:"Point",
          enum:["Point"]
      },
      coordinates:[Number]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const propertyModel=mongoose.model('Property',propertySchema);
module.exports=propertyModel;