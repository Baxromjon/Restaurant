const express = require('express');
const app = express();
const winston = require('winston');
const mongoose=require('mongoose');
require('./startup/db');
require('./startup/routes')(app);
require('./startup/config');
require('./startup/logging')

mongoose.connect('mongodb://localhost/restaraunt')
        .then(() => {
            console.log('connecting to mongoDB')
        });

const port = process.env.PORT || 5000;
module.exports = app.listen(port, () => {
    console.log(`${port} - started to here port`)
});
