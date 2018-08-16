const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('GET /', () => {
        it('should return status code 200', async () => {
            await request(server).get('/').expect(200);
        });

        it('should return JSON', async () => {
            await request(server).get('/').expect('Content-Type', /json/);
        });

        it(`should return an object containing { api: 'running' } `, async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'running' });
        });
    });

    describe('POST /greet', () => {
        it('should return status code 200', async () => {
            await request(server).post('/greet').send({ name: 'Tanner' }).expect(200);
        });

        it('should return JSON', async () => {
            await request(server).post('/greet').send({ name: 'Tanner' }).expect('Content-Type', /json/);
        });

        it(`should return { hello: name } when name is provided inside body`, async () => {
            const expected = { hello: 'Tanner' };
            const res = await request(server)
                .post('/greet')
                .send({ name: 'Tanner' });

            expect(res.body).toEqual(expected);
        });
    });

    describe('PUT /greet/:id', () => {
        it('should return status code 200', async () => {
            await request(server).put('/greet/tanner').send({ name: 'Dan' }).expect(200);
        });

        it('should return JSON', async () => {
            await request(server).put('/greet/tanner').send({ name: 'Dan' }).expect('Content-Type', /json/);
        });

        it(`should return { hello: name } when name is provided inside body`, async () => {
            const expected = { hello: 'Changed name from tanner to Dan' };
            const res = await request(server)
                .put('/greet/tanner')
                .send({ name: 'Dan' });

            expect(res.body).toEqual(expected);
        });
    });

    describe('DELETE /greet/:id', () => {
        it('should return status code 200', async () => {
            const res = await request(server)
                .delete('/greet/tanner')
                .expect(200);
        });
    });
});