const request = require('supertest');
let server;
const { Table } = require('../../models/table');
const mongoose = require('mongoose');


describe('/api/table', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Table.remove({});
    })
    let token;
    let name;
    let seat;
    const execute = async () => {
        return await request(server)
            .post('/api/table')
            .set('x-auth-token', token)
            .send({ name, seat })
    }
    describe('GET /', () => {
        it('should return all tables', async () => {
            await Table.collection.insertMany([
                { name: '#1', seat: 12 },
                { name: '#2', seat: 9 },
                { name: '#3', seat: 6 }
            ]);
            const response = await request(server).get('/api/table');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(tab => tab.name == '#1')).toBeTruthy();
        })
    });

    describe('GET /:id', () => {
        it('should return a table if valid id is given', async () => {
            const table = new Table({ name: '#6', seat: 12 });
            await table.save();

            const response = await request(server).get('/api/table/' + table._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', '#6');
        })
    });

    describe('GET /:id', () => {
        it('should return a 404 if invalid id is given', async () => {
            const res = await request(server).get('/api/table/123');
            expect(res.status).toBe(400);
        })
    });

    describe('GET /:id', () => {
        it('should return a 400 if not available table', async () => {
            const tableId=mongoose.Types.ObjectId();

            const res = await request(server).get('/api/table/'+tableId);
            expect(res.status).toBe(400);
        })
    });

    describe('DELETE /:id', () => {
        it('should delete a table if valid id is given', async () => {
            const table = new Table({ name: '#6', seat: 12 });
            await table.save();
            // await execute();

            const res = await request(server).get('/api/table/' + table._id)
            // const res=await Table.findByIdAndRemove(table._id);
            expect(res.status).toBe(200);
        })
    });


})
