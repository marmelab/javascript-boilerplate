/* eslint-disable func-names */
import expect from 'expect';

import request from '../../../common/e2e/lib/request';

describe('/api', () => {
    describe('GET', () => {
        it('should not require authentification', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/api',
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });
    });

    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode, body } = yield request({
                method: 'PUT',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode, body } = yield request({
                method: 'DELETE',
                url: '/api',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
});
