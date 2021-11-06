const express = require('express');
const router = express.Router();
const { Table, validationTable } = require('../models/table');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const tables = await Table.find().sort('name');
    res.send(tables);
});

//POST
router.post('/', async (req, res) => {
    const { error } = validationTable(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let table = new Table({
        name: req.body.name,
        seat: req.body.seat
    });
    table = await table.save();
    res.status(200).send(table);
});

//PUT
router.put('/:id', async (req, res) => {
    const { error } = validationTable(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let table = await Table.findByIdAndUpdate(req.params.id, { name: req.body.name, seat: req.body.seat }, { new: true })
    if (!table)
        return res.status(400).send('table not found');

    await table.save();
    res.send('Successfully edited!');
});

//GET
router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid id')
    const table = await Table.findById(req.params.id);
    if (!table)
        return res.status(400).send('Table not found!')

    res.send(table);
});

//DELETE
router.delete('/:id', async (req, res) => {
    const table = await Table.findByIdAndRemove(req.params.id);
    if (!table)
        return res.status(404).send('wrong id');

    res.send(table.name + ' successfully deleted!');
})

module.exports = router;
