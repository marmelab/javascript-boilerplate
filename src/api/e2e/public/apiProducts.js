/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';

describe('/api/products', () => {
    describe('GET', () => {
        let fixtureLoader;
        let db;
        let pool;

        before(async () => {
            pool = new PgPool(config.apps.api.db);
            db = await pool.connect();
            fixtureLoader = fixturesFactory(db);

            await fixtureLoader.loadDefaultFixtures();
        });

        it('should not require authentification', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/api/products',
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });

        it('should return a list of all products', async () => {
            const { body } = await request({
                method: 'GET',
                url: '/api/products',
            });
            expect(body.length).toEqual(3);

            const requestedProducts = body.map((product) => {
                const p = Object.assign({}, product);
                delete p.id;
                delete p.totalcount;
                return p;
            });

            expect(requestedProducts).toEqual([
                {
                    reference: 'abc',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'John the zoo',
                    stock: 10,
                },
                {
                    reference: 'efg',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Frank on toilet',
                    stock: 10,
                },
                {
                    reference: 'hij',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Miles in the kitchen',
                    stock: 10,
                },
            ]);
        });

        after(async () => {
            await fixtureLoader.removeAllFixtures();
            db.release();
            pool.end();
        });
    });

    describe('POST', () => {
        it('should not allow POST request', async () => {
            const { body, statusCode } = await request({
                method: 'POST',
                url: '/api/products',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', async () => {
            const { body, statusCode } = await request({
                method: 'PUT',
                url: '/api/products',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('DELETE', () => {
        it('should not allow DELETE request', async () => {
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: '/api/products',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
});
