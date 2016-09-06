import { expect } from 'chai';
import orderActions, { orderActionTypes } from './actions';

describe('orderActions', () => {
    it('orderActions.list.request should return the correct action', () => {
        expect(orderActions.list.request()).to.deep.equal({
            type: orderActionTypes.list.REQUEST,
        });
    });

    it('orderActions.list.success should return the correct action', () => {
        expect(orderActions.list.success([{ id: 1 }])).to.deep.equal({
            type: orderActionTypes.list.SUCCESS,
            payload: [{ id: 1 }],
        });
    });

    it('orderActions.list.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(orderActions.list.failure(error)).to.deep.equal({
            type: orderActionTypes.list.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('orderActions.item.request should return the correct action', () => {
        expect(orderActions.item.request()).to.deep.equal({
            type: orderActionTypes.item.REQUEST,
        });
    });

    it('orderActions.item.success should return the correct action', () => {
        expect(orderActions.item.success([{ id: 1 }])).to.deep.equal({
            type: orderActionTypes.item.SUCCESS,
            payload: [{ id: 1 }],
        });
    });

    it('orderActions.item.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(orderActions.item.failure(error)).to.deep.equal({
            type: orderActionTypes.item.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('orderActions.order.request should return the correct action', () => {
        expect(orderActions.order.request()).to.deep.equal({
            type: orderActionTypes.order.REQUEST,
        });
    });

    it('orderActions.order.success should return the correct action', () => {
        expect(orderActions.order.success([{ id: 1 }])).to.deep.equal({
            type: orderActionTypes.order.SUCCESS,
            payload: [{ id: 1 }],
        });
    });

    it('orderActions.order.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(orderActions.order.failure(error)).to.deep.equal({
            type: orderActionTypes.order.FAILURE,
            payload: error,
            error: true,
        });
    });
});
