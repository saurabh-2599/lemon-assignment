const authController=require('../Controllers/authController');
const express=require('express');
const router=express.Router();
router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/valid',authController.verify,authController.checkValid);
module.exports=router;