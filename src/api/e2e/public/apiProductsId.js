/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';

describe('/api/products/{id}', () => {
    let fixtureLoader;
    let db;
    let pool;
    let product;

    before(async () => {
        pool = new PgPool(config.apps.api.db);
        db = await pool.connect();
        fixtureLoader = fixturesFactory(db);
        product = await fixtureLoader.addProduct();
    });

    describe('GET', () => {
        it('should not require authentification', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });

        it('should return information about a specific product', async () => {
            const { body } = await request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });

            // Have to use Object.assign here because body and product do not have the same prototype
            // See https://github.com/mjackson/expect/issues/153
            expect(Object.assign({}, body)).toEqual(Object.assign({}, product));
        });
    });

    describe('POST', () => {
        it('should not allow POST request', async () => {
            const { body, statusCode } = await request({
                method: 'POST',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', async () => {
            const { body, statusCode } = await request({
                method: 'PUT',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('DELETE', () => {
        it('should not allow DELETE request', async () => {
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
    after(async () => {
        await fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
