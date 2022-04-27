const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});
console.log(process.env.db);
const app=require('./app');
mongoose.connect(process.env.db).then(() => console.log("connection successful")).catch(err => console.log("connection failed:"+err))
app.listen(8001,() => console.log("server has been succesfully started"));