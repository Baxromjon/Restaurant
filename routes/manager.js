const express = require('express');
const router = express.Router();
const { Manager, validationManager } = require('../models/manager');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { Restaurant } = require('../models/restaurant');


router.get('/', async (req, res) => {
    const managers = await Manager.find().sort('name');
    res.send(managers);
});

//POST
router.post('/', async (req, res) => {
    const { error } = validationManager(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let restaurant = await Restaurant.findById([req.body.restaurantId]);
    console.log(restaurant);
    if (!restaurant)
        return res.status(400).send('Restaraunt not found!');

    let manager = await Manager.findOne({ email: req.body.email });
    if (manager)
        return res.status(400).send('the manager already exists');

    manager = new Manager( {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:req.body.isAdmin,
        restaurant:[{
            _id:restaurant._id,
            name:restaurant.name
        }]
    });
    const salt = await bcrypt.genSalt();
    manager.password = await bcrypt.hash(manager.password, salt);
    await manager.save();
    res.send(_.pick(manager, ['_id', 'name', 'email', 'isAdmin', 'restaurant']));
});

//DELETE
// router.delete('/:id', auth, async (req, res) => {
//     let manager = await Manager.findByIdAndRemove(req.params.id);

//     if (!manager)
//         return res.status(400).send('Manager not found');

//     res.send(manager.name + ' Successfully deleted!')
// })



module.exports = router;