const userModel=require('../Models/User.js');
const jwt=require('jsonwebtoken')
const register=async(req,res,next) => {
    try{
      const newUser=await userModel.create({...req.body});
      res.status(201).json({
          status:"success",
          data:{
              newUser
          }
      })
    }
    catch(e){
        console.log(e);
        res.end("Something went wrong")
    }
}
const login=async(req,res,next) => {
    try{
        const {email,password}=req.body;
        //check user with that email exist
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("Please enter valid email or password");
        }
        console.log(user);
        // match the password
        const checkPassword=await user.checkPassword(password,user.password)
        console.log(checkPassword);
        if(!checkPassword){
            throw new Error("Please enter valid email or password");
        }
        //genereate token
        const token=await jwt.sign({id:user._id},process.env.secret,{expiresIn:process.env.expiresIn});
        res.status(200).json({
            status:"success",
            data:{
                token
            }
        })
    }
    catch(e){
        console.log(e);
        res.end("something went wrong")
    }
}
const verify=async(req,res,next) => {
    try{
    //check if token is inputted from user
    let token=req.headers.authorization;
    if(!token || (!token.startsWith("Bearer"))){
        throw new Error("Please login again");
    }
    token=token.split(' ')[1];
    //check if the token is valid
    const isValidToken=jwt.verify(token,process.env.secret);
    if(!isValidToken){
        throw new Error("Invalid access.Please log in Again")
    }
    //if everything goes well give the access to next Middleware
    next();
}
catch(e){
    console.log(e);
    res.end("Something went wrong")
}
}
const checkValid=async(req,res,next) => res.send("Authorize to this route")
exports.register=register;
exports.login=login;
exports.verify=verify;
exports.checkValid=checkValid;