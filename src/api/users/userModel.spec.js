/* eslint func-names:0 */

import { assert } from 'chai';
import sinon from 'sinon';
import userModel from './userModel';

describe('User Model', () => {
    let client;

    beforeEach(() => {
        client = sinon.spy();
        client.link = () => ({});
    });

    it('should show basic infos', () => {
        assert.deepEqual(userModel.queries.selectOne.table(), 'user_account');
        assert.deepEqual(userModel.queries.selectOne.returnFields(), [
            'id',
            'email',
            'password',
        ]);
    });

    it('should correctly retrieve user by email', function* () {
        client = {
            link: () => ({
                findByEmail: (email) => {
                    assert.deepEqual(email, 'email@example.org');

                    return Promise.resolve([{ id: 42, email: 'email@example.org' }]);
                },
            }),
        };

        const res = yield userModel(client).findByEmail('email@example.org');
        assert.deepEqual(res, { id: 42, email: 'email@example.org' });
    });
});
