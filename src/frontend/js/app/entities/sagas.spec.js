import { expect } from 'chai';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import sinon from 'sinon';
import {
    fetchFactory,
    takeEveryFetchFactory,
} from './sagas';

describe('entities sagas', () => {
    const jwtSelector = () => 'token';

    const actions = {
        failure: sinon.stub().returnsArg(0),
        success: sinon.stub().returnsArg(0),
    };

    describe('fetchFactory', () => {
        const actionWithoutPayload = {};
        const actionWithPayload = { payload: 'entityId' };
        const successfullFetch = sinon.stub().returns(Promise.resolve({ result: [{ id: 42 }] }));

        it('should get the jwt using select and the specified selector', () => {
            const saga = fetchFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);

            expect(saga.next().value).to.deep.equal(select(jwtSelector));
        });

        it('should call the specified fetch function', () => {
            const saga = fetchFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);
            saga.next();

            expect(saga.next('token').value).to.deep.equal(call(successfullFetch, 'token', undefined));
        });

        it('should call the specified fetch function with payload if any', () => {
            const saga = fetchFactory(actions, successfullFetch, jwtSelector)(actionWithPayload);
            saga.next();

            expect(saga.next('token').value).to.deep.equal(call(successfullFetch, 'token', 'entityId'));
        });

        it('should put the actions.success action with response result on successfull fetch', () => { // eslint-disable-line max-len
            const saga = fetchFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);

            saga.next({});
            saga.next();

            expect(saga.next({
                result: [{ id: 42 }],
            }).value).to.deep.equal(put(actions.success([{ id: 42 }])));
        });

        it('should put the actions.failure action with error on failed fetch', () => {
            const error = new Error('Run you fools');
            const fetch = sinon.stub().returns(Promise.resolve({ error }));
            const saga = fetchFactory(actions, fetch, jwtSelector)(actionWithoutPayload);

            saga.next();
            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(actions.failure(error)));
        });
    });

    describe('takeEveryFetchFactory', () => {
        it('should take every action of type REQUEST', () => {
            const saga = takeEveryFetchFactory({
                REQUEST: 'test/REQUEST',
            })();
            const fetch = sinon.stub().returns(Promise.resolve({ result: [{ id: 42 }] }));
            const fetchSaga = fetchFactory(actions.list, fetch, jwtSelector);

            expect(saga.next()).to.deep.equal(takeEvery('test/REQUEST', fetchSaga).next()); // eslint-disable-line max-len
        });
    });
});
