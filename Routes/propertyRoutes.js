const propertyController=require('../Controllers/propertyController');
const authController=require('../Controllers/authController');
const express=require('express');
const router=express.Router();
router.route('/').post(authController.verify,propertyController.createProperty).get(authController.verify,propertyController.getProperties);
router.route('/:id').get(authController.verify,propertyController.getPropertyById).patch(authController.verify,propertyController.updateProperty).delete(authController.verify,propertyController.deleteProperty);
module.exports=router;