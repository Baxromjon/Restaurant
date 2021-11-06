const express = require('express');
const router = express.Router();
const { Manager } = require('../models/manager');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let manager = await Manager.findOne({ email: req.body.email });
    if (!manager)
        return res.status(400).send('Email or password error!');
    const isValidPassword=await bcrypt.compare(req.body.password, manager.password);
    
    if(!isValidPassword)
    return res.status(400).send('Email or password error!');

    const token=manager.generateAuthToken();
    res.header('x-auth-token', token).send('successfully');

});

function validate(req) {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(6).max(15)
    }
    return Joi.validate(req, schema);
}

module.exports = router;