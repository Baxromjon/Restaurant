const mongoose =require('mongoose');
const { config } = require('winston');
const winston = require('winston');

module.exports = function () {
    mongoose.connect(config.get('db'))
        .then(() => {
            console.log('MongoDBga ulanish hosil qilindi')
        })
    // mongoose.set('useFindAndModify', false);
}