import expect from 'expect';
import createFetchActionTypes from './createFetchActionTypes';

describe('createFetchActionTypes', () => {
    it('should return an object with REQUEST, SUCCESS and FAILURE properties', () => {
        const actionTypes = createFetchActionTypes('foo');

        expect(actionTypes).toEqual({
            REQUEST: 'foo_REQUEST',
            SUCCESS: 'foo_SUCCESS',
            FAILURE: 'foo_FAILURE',
        });
    });
});
