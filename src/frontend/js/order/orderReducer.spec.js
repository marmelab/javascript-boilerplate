import {expect} from 'chai';
import orderReducer from './orderReducer';
import { orderActionTypes } from './orderActions';

describe('order reducer', () => {
    it('should return its initial state', () => {
        expect(orderReducer(undefined, { type: 'foo' })).to.deep.equal({
            error: false,
            item: undefined,
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.list.SUCCESS action', () => {
        expect(orderReducer(undefined, { type: orderActionTypes.list.SUCCESS, payload: [{ id: 1 }]})).to.deep.equal({
            error: false,
            item: undefined,
            list: [{ id: 1 }],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.list.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(orderReducer(undefined, { type: orderActionTypes.list.FAILURE, payload: error, error: true } )).to.deep.equal({
            item: undefined,
            list: [],
            error,
            loading: false,
        });
    });
});
