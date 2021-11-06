const Joi = require('joi');
const mongoose = require('mongoose');

const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
 const Restaurant=mongoose.model('Restaurant', restaurantSchema);

 function validationRestaurant(restaurant){
     const restaurantSchema={
         name:Joi.string().required().min(3)
     }
     return Joi.validate(restaurant, restaurantSchema);
 };

 module.exports.Restaurant=Restaurant;
 module.exports.validationRestaurant=validationRestaurant;
 module.exports.restaurantSchema=restaurantSchema;