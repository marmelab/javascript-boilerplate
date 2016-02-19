import {expect} from 'chai';
import productReducer from './productReducer';
import { productActionTypes } from './productActions';

describe('product reducer', () => {
    it('should return its initial state', () => {
        expect(productReducer(undefined, { type: 'foo' })).to.deep.equal({
            error: null,
            item: null,
            list: [],
            loading: false,
        });
    });

    it('should handle the productActionTypes.list.SUCCESS action', () => {
        expect(productReducer(undefined, { type: productActionTypes.list.SUCCESS, payload: [{ id: 1 }]})).to.deep.equal({
            error: null,
            item: null,
            list: [{ id: 1 }],
            loading: false,
        });
    });

    it('should handle the productActionTypes.list.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(productReducer(undefined, { type: productActionTypes.list.FAILURE, payload: error, error: true } )).to.deep.equal({
            error,
            item: null,
            list: [],
            loading: false,
        });
    });

    it('should handle the productActionTypes.item.SUCCESS action', () => {
        expect(productReducer(undefined, { type: productActionTypes.item.SUCCESS, payload: { id: 1 }})).to.deep.equal({
            error: null,
            item: { id: 1 },
            list: [],
            loading: false,
        });
    });

    it('should handle the productActionTypes.item.FAILURE action', () => {
        const error = new Error('Run you fools!');
        expect(productReducer(undefined, { type: productActionTypes.item.FAILURE, payload: error, error: true } )).to.deep.equal({
            error,
            item: null,
            list: [],
            loading: false,
        });
    });
});
