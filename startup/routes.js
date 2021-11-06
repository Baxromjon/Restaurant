const express = require('express');
const managerRoutes = require('../routes/manager');
const authRoutes = require('../routes/auth');
const tableRoutes = require('../routes/table');
const rsRoutes = require('../routes/reservation');
const errorMiddlware = require('../middleware/error');
const restaurantRoutes = require('../routes/restaurant')
require('../startup/config');




module.exports = function (app) {
    app.use(express.json());
    app.use(errorMiddlware);
    app.use('/api/managers', managerRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/table', tableRoutes);
    app.use('/api/reservation', rsRoutes);
    app.use('/api/restaurant', restaurantRoutes);
}