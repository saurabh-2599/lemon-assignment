//importing router
const userRouter=require('./Routes/userRoutes.js');
const propertyRouter=require('./Routes/propertyRoutes.js');
const express=require('express');
//creating a express server
const app=express()
//body parser middleware
app.use(express.json());
//mounting routes to router
app.use('/lemon/api',userRouter);
app.use('/lemon/api/property',propertyRouter);
module.exports=app;