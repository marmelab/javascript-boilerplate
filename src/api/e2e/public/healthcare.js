/* eslint-disable func-names */
import expect from 'expect';

import request from '../../../common/e2e/lib/request';

describe('/healthcare', () => {
    describe('GET', () => {
        it('should return an object describing the API health', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/healthcare',
            });
            expect(statusCode).toEqual(200, JSON.stringify(body));
            expect(body).toEqual({
                api: 'OK',
                db: 'OK',
                internetAccess: 'OK',
            });
        });
    });
});
