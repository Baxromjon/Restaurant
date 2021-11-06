const mongoose = require('mongoose');
const Joi = require('joi');
const { tableSchema } = require('./table');

const schema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 9
    },
    dateOfReserv: {
        type: String,
        required: true
    },
    timeOfReserv: {
        type: String,
        required: true
    },
    table: {
        type: tableSchema,
        required: true
    }
})

const Reservation = mongoose.model('Reservation', schema);

function validateRS(reservation) {
    const schema = {
        clientName: Joi.string().required().min(3),
        phoneNumber: Joi.string().required().min(9),
        dateOfReserv: Joi.string().required(),
        timeOfReserv: Joi.string().required(),
        tableId: Joi.string().required()
    };
    return Joi.validate(reservation, schema);
};

module.exports.Reservation = Reservation;
module.exports.validateRS = validateRS;