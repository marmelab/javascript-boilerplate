import { expect } from 'chai';
import productActions, { productActionTypes } from './productActions';

describe('productActions', () => {
    it('productActions.list.request should return the correct action', () => {
        expect(productActions.list.request()).to.deep.equal({
            type: productActionTypes.list.REQUEST,
            payload: undefined,
        });
    });

    it('productActions.list.success should return the correct action', () => {
        expect(productActions.list.success([{ id: 1 }])).to.deep.equal({
            type: productActionTypes.list.SUCCESS,
            payload: [{ id: 1 }],
        });
    });

    it('productActions.list.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(productActions.list.failure(error)).to.deep.equal({
            type: productActionTypes.list.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('productActions.item.request should return the correct action', () => {
        expect(productActions.item.request()).to.deep.equal({
            type: productActionTypes.item.REQUEST,
            payload: undefined,
        });
    });

    it('productActions.item.success should return the correct action', () => {
        expect(productActions.item.success({ id: 1 })).to.deep.equal({
            type: productActionTypes.item.SUCCESS,
            payload: { id: 1 },
        });
    });

    it('productActions.item.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(productActions.item.failure(error)).to.deep.equal({
            type: productActionTypes.item.FAILURE,
            payload: error,
            error: true,
        });
    });
});
