const express = require('express');
const router = express.Router();
const { Reservation, validateRS } = require('../models/reservation');
const { Table } = require('../models/table');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');


router.get('/', [auth, admin], async (req, res) => {
    try {
        let { pageNumber, pageSize, sort } = req.query;
        if (!pageNumber) { pageNumber = 1 }
        if (!pageSize) { pageSize = 10 }
        const limit = parseInt(pageSize);

        const reservation = await Reservation.find()
            .sort('table')
            .skip((pageNumber - 1) * pageSize)
            .limit(limit)
        res.send({ pageNumber, pageSize, Info: reservation })
    }
    catch (error) {
        res.status(500);
    }
});

//GETBYID
router.get('/:id', [admin, auth], async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    res.send(reservation);
})

//POST
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validateRS(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let table = await Table.findById(req.body.tableId);
    if (!table)
        return res.status(400).send('Table not found');

    let reservation = new Reservation({
        clientName: req.body.clientName,
        phoneNumber: req.body.phoneNumber,
        dateOfReserv: req.body.dateOfReserv,
        timeOfReserv: req.body.timeOfReserv,
        table: {
            _id: table._id,
            name: table.name,
            seat: table.seat
        }
    });
    reservation = await reservation.save();
    res.status(200).send('space for the ' + reservation.clientName + ' is booked')
});

//PUT
router.put('/:id', [admin, auth], async (req, res) => {
    const { error } = validateRS(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    let table = await Table.findById(req.body.tableId);
    if (!table)
        return res.status(404).send('Table not found!');

    const reservation = await Reservation.findByIdAndUpdate(req.params.id, {
        clientName: req.body.clientName,
        phoneNumber: req.body.phoneNumber,
        dateOfReserv: req.body.dateOfReserv,
        timeOfReserv: req.body.timeOfReserv,
        table: {
            _id: table._id,
            name: table.name,
            seat: table.seat
        }
    }, { new: true });

    if (!reservation)
        return res.status(404).send('reservation not available!');

    res.send('The location for the ' + reservation.clientName + ' has been successfully changed');
});

//DELETE
router.delete('/:id', [admin, auth], async (req, res) => {
    await Reservation.findByIdAndRemove(req.params.id);
    res.send('Successfully deleted!')
})

module.exports = router;