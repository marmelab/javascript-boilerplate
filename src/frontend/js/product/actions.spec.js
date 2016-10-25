import expect from 'expect';
import productActions, { productActionTypes } from './actions';

describe('productActions', () => {
    describe('.list', () => {
        it('.request should return the correct action', () => {
            expect(productActions.list.request()).toEqual({
                type: productActionTypes.list.REQUEST,
            });
        });

        it('.success should return the correct action', () => {
            expect(productActions.list.success([{ id: 1 }])).toEqual({
                type: productActionTypes.list.SUCCESS,
                payload: [{ id: 1 }],
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(productActions.list.failure(error)).toEqual({
                type: productActionTypes.list.FAILURE,
                payload: error,
                error: true,
            });
        });
    });

    describe('.item', () => {
        it('.request should return the correct action', () => {
            expect(productActions.item.request('foo')).toEqual({
                type: productActionTypes.item.REQUEST,
                payload: { id: 'foo' },
            });
        });

        it('.success should return the correct action', () => {
            expect(productActions.item.success({ id: 1 })).toEqual({
                type: productActionTypes.item.SUCCESS,
                payload: { id: 1 },
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(productActions.item.failure(error)).toEqual({
                type: productActionTypes.item.FAILURE,
                payload: error,
                error: true,
            });
        });
    });
});
