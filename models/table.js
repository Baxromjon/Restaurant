const mongoose = require('mongoose');
const Joi = require('joi');
const {restaurantSchema}=require('../models/restaurant')


const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true,
        minlength:2,
        maxlength:30
    },
    restaurant:{
        type:restaurantSchema,
        required:true
    }
});

const Table = mongoose.model('Table', tableSchema);

function validationTable(table) {
    const tableSchema = {
        name: Joi.string().required(),
        seat: Joi.number().required().max(30).min(2),
        restaurantId:Joi.array().item(Joi.string()).required()
    }
    return Joi.validate(table, tableSchema);
};

module.exports.Table = Table;
module.exports.tableSchema = tableSchema;
module.exports.validationTable = validationTable;
