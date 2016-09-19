/* eslint func-names:0 */

import { assert } from 'chai';
import sinon from 'sinon';
import userRepository from './userModel';

describe('User Model', () => {
    let client;

    beforeEach(() => {
        client = sinon.spy();
    });

    it('should show basic infos', () => {
        const model = userRepository(client);
        assert.deepEqual(model.tableName, 'user_account');
        assert.deepEqual(model.exposedFields, [
            'id',
            'email',
            'password',
        ]);
    });

    it('should correctly retrieve user by email', function* () {
        client = {
            query: function* ({ sql, parameters }) {
                assert.deepEqual(parameters.email, 'email@example.org');

                return [{ id: 42, email: 'email@example.org' }];
            },
        };

        const res = yield userRepository(client).findByEmail('email@example.org');
        assert.deepEqual(res, { id: 42, email: 'email@example.org' });
    });
});
