import {expect} from 'chai';
import orderReducer from './orderReducer';
import { orderActionTypes } from './orderActions';

describe('order reducer', () => {
    it('should return its initial state', () => {
        expect(orderReducer(undefined, { type: 'foo' })).to.deep.equal({
            error: null,
            item: null,
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.list.SUCCESS action', () => {
        expect(orderReducer(undefined, { type: orderActionTypes.list.SUCCESS, payload: [{ id: 1 }]})).to.deep.equal({
            error: null,
            item: null,
            list: [{ id: 1 }],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.list.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(orderReducer(undefined, { type: orderActionTypes.list.FAILURE, payload: error, error: true } )).to.deep.equal({
            error,
            item: null,
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.item.SUCCESS action', () => {
        expect(orderReducer(undefined, { type: orderActionTypes.item.SUCCESS, payload: { id: 1 }})).to.deep.equal({
            error: null,
            item: { id: 1 },
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.item.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(orderReducer(undefined, { type: orderActionTypes.item.FAILURE, payload: error, error: true } )).to.deep.equal({
            error,
            item: null,
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.order.SUCCESS action', () => {
        expect(orderReducer(undefined, { type: orderActionTypes.order.SUCCESS, payload: { id: 1 }})).to.deep.equal({
            error: null,
            item: { id: 1 },
            list: [],
            loading: false,
        });
    });

    it('should handle the orderActionTypes.order.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(orderReducer(undefined, { type: orderActionTypes.order.FAILURE, payload: error, error: true } )).to.deep.equal({
            error,
            item: null,
            list: [],
            loading: false,
        });
    });
});
