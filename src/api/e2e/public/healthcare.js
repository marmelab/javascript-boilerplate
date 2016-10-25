/* eslint-disable func-names */
import { assert } from 'chai';

import request from '../../../common/e2e/lib/request';

describe('/healthcare', () => {
    describe('GET', () => {
        it('should return an object describing the API health', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/healthcare',
            });
            assert.equal(statusCode, 200, JSON.stringify(body));
            assert.deepEqual(body, {
                api: 'OK',
                db: 'OK',
                internetAccess: 'OK',
            });
        });
    });
});
