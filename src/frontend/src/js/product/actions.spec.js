import { expect } from 'chai';
import productActions, { productActionTypes } from './actions';

describe('productActions', () => {
    describe('.list', () => {
        it('.request should return the correct action', () => {
            expect(productActions.list.request()).to.deep.equal({
                type: productActionTypes.list.REQUEST,
            });
        });

        it('.success should return the correct action', () => {
            expect(productActions.list.success([{ id: 1 }])).to.deep.equal({
                type: productActionTypes.list.SUCCESS,
                payload: [{ id: 1 }],
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(productActions.list.failure(error)).to.deep.equal({
                type: productActionTypes.list.FAILURE,
                payload: error,
                error: true,
            });
        });
    });

    describe('.item', () => {
        it('.request should return the correct action', () => {
            expect(productActions.item.request('foo')).to.deep.equal({
                type: productActionTypes.item.REQUEST,
                payload: { id: 'foo' },
            });
        });

        it('.success should return the correct action', () => {
            expect(productActions.item.success({ id: 1 })).to.deep.equal({
                type: productActionTypes.item.SUCCESS,
                payload: { id: 1 },
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(productActions.item.failure(error)).to.deep.equal({
                type: productActionTypes.item.FAILURE,
                payload: error,
                error: true,
            });
        });
    });
});
