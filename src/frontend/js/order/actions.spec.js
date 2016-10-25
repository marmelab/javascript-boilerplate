import expect from 'expect';
import orderActions, { orderActionTypes } from './actions';

describe('orderActions', () => {
    describe('.list', () => {
        it('.request should return the correct action', () => {
            expect(orderActions.list.request()).toEqual({
                type: orderActionTypes.list.REQUEST,
            });
        });

        it('.success should return the correct action', () => {
            expect(orderActions.list.success([{ id: 1 }])).toEqual({
                type: orderActionTypes.list.SUCCESS,
                payload: [{ id: 1 }],
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(orderActions.list.failure(error)).toEqual({
                type: orderActionTypes.list.FAILURE,
                payload: error,
                error: true,
            });
        });
    });

    describe('.item', () => {
        it('.request should return the correct action', () => {
            expect(orderActions.item.request('foo')).toEqual({
                type: orderActionTypes.item.REQUEST,
                payload: { id: 'foo' },
            });
        });

        it('.success should return the correct action', () => {
            expect(orderActions.item.success([{ id: 1 }])).toEqual({
                type: orderActionTypes.item.SUCCESS,
                payload: [{ id: 1 }],
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(orderActions.item.failure(error)).toEqual({
                type: orderActionTypes.item.FAILURE,
                payload: error,
                error: true,
            });
        });
    });

    describe('.order', () => {
        it('.request should return the correct action', () => {
            expect(orderActions.order.request([{ id: 'foo' }])).toEqual({
                type: orderActionTypes.order.REQUEST,
                payload: { body: { products: [{ id: 'foo' }] } },
            });
        });

        it('.success should return the correct action', () => {
            expect(orderActions.order.success([{ id: 1 }])).toEqual({
                type: orderActionTypes.order.SUCCESS,
                payload: [{ id: 1 }],
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');
            expect(orderActions.order.failure(error)).toEqual({
                type: orderActionTypes.order.FAILURE,
                payload: error,
                error: true,
            });
        });
    });
});
