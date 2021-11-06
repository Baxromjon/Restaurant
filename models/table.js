const mongoose = require('mongoose');
const Joi = require('joi');
const string = require('joi/lib/types/string');
const number = require('joi/lib/types/number');


const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true
    }
});

const Table = mongoose.model('Table', tableSchema);

function validationTable(table) {
    const tableSchema = {
        name: Joi.string().required(),
        seat: Joi.number().required()
    }
    return Joi.validate(table, tableSchema);
};

module.exports.Table = Table;
module.exports.tableSchema = tableSchema;
module.exports.validationTable = validationTable;
