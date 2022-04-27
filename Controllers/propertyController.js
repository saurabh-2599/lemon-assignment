const propertyModel=require('../Models/Property.js');
exports.createProperty=async(req,res,next) => {
    try{
      const {propertyName,amount,listedBy,contact,address,createdAt}=req.body;
      console.log(address);
      const newProperty=await propertyModel.create({propertyName,amount,listedBy,contact,address,createdAt});
      res.status(201).json({
          status:"success",
          data:{
              newProperty
          }
      })
    }
    catch(e){
        console.log(e)
        res.end("Something went wrong")
    }
}
exports.getProperties=async(req,res,next) =>{
    try{
     const properties=await propertyModel.find().populate({
         path:'listedBy',
         select:'-password -createdAt'
     });
     res.status(200).json({
         status:"success",
         data:{
             properties
         }
     })
    }
    catch(e){
        console.log(e);
        res.end("something went wrong");
    }
}
exports.getPropertyById=async(req,res,next) => {
    try{
       const property=await propertyModel.findById(req.params.id).populate({
           path:"listedBy",
           select:'-password -createdAt'
       })
       res.status(200).json({
           status:"success",
           data:{
               property
           }
       })
    }
    catch(e){
        console.log(e)
        res.end("something went wrong");
}
}
exports.updateProperty=async(req,res,next) => {
    try{
       const property=await propertyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
       res.status(202).json({
           status:"success",
           data:{
               property
           }
       })
    }
    catch(e){
        console.log(e)
    }
}
exports.deleteProperty=async(req,res,next) => {
    try{
      const property=await propertyModel.findByIdAndDelete(req.params.id);
      if(!property){
          throw new Error("Property does not exist");
      }
      res.status(203).json({
          status:"success",
          data:null
      })
    }
    catch(e){
        console.log(e)
        res.end("something went wrong")
    }
}