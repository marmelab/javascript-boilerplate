/* eslint-disable func-names */
import expect from 'expect';

import request from '../../../common/e2e/lib/request';

describe('/api', () => {
    describe('GET', () => {
        it('should not require authentification', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/api',
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });
    });

    describe('POST', () => {
        it('should not allow POST request', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', async () => {
            const { statusCode, body } = await request({
                method: 'PUT',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('DELETE', () => {
        it('should not allow DELETE request', async () => {
            const { statusCode, body } = await request({
                method: 'DELETE',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
});
