/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';

describe('/api/sign-in', () => {
    let fixtureLoader;
    let db;
    let pool;

    before(async () => {
        pool = new PgPool(config.apps.api.db);
        db = await pool.connect();
        fixtureLoader = fixturesFactory(db);

        await fixtureLoader.loadDefaultFixtures();
    });

    describe('GET', () => {
        it('should not allow GET request', async () => {
            const { statusCode, body } = await request({
                method: 'PUT',
                url: '/api/sign-in',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('POST', () => {
        it('should return 401 with an empty email and password', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: '',
                    password: '',
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });
        it('should return 401 with an empty email', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: '',
                    password: 'password',
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });
        it('should return 401 with an empty password', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: '',
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });
        it('should return 401 with a wrong email', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'none@marmelab.io',
                    password: 'password',
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });
        it('should return 401 with a wrong password', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: 'wrongpassword',
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });
        it('should return 200 with a valid email and password', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: 'password',
                },
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', async () => {
            const { statusCode, body } = await request({
                method: 'PUT',
                url: '/api/sign-in',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', async () => {
            const { statusCode, body } = await request({
                method: 'DELETE',
                url: '/api/sign-in',
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
