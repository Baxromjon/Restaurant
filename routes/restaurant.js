const express = require('express');
const router = express.Router();
const { Restaurant, validationRestaurant } = require('../models/restaurant');


router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find().sort('name');
    res.send(restaurants);
});

router.post('/', async (req, res) => {
    const { error } = validationRestaurant(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let restaurant = await Restaurant.findOne({ name: req.body.name });
    if (!restaurant) {
        restaurant = new Restaurant({
            name: req.body.name
        });
        restaurant = await restaurant.save();
        return res.status(200).send(restaurant);
    }
    return res.send('Restaurant already exists');
})

module.exports = router;