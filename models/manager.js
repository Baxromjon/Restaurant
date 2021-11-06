const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const {restaurantSchema}=require('../models/restaurant');



const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    restaurant:[{
        type:restaurantSchema,
        required:true
    }],
    isAdmin: Boolean
});
managerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const Manager = mongoose.model('Manager', managerSchema);

function validationManager(manager) {
    const managerSchema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(6).max(20),
        isAdmin:Joi.boolean().required(),
        restaurantId:Joi.array().items(Joi.string()).required()
    }
    return Joi.validate(manager, managerSchema);
};

exports.Manager = Manager;
exports.validationManager = validationManager;