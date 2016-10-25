import expect, { createSpy } from 'expect';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import {
    fetchSagaFactory,
    takeEveryRequestSagaFactory,
} from './sagas';

describe('fetch sagas', () => {
    const jwtSelector = () => 'token';

    const actions = {
        failure: createSpy().andCall(type => type),
        success: createSpy().andCall(type => type),
    };

    describe('fetchSagaFactory', () => {
        const actionWithoutPayload = {};
        const actionWithPayload = { payload: { id: 'entityId' } };
        const successfullFetch = createSpy().andReturn(Promise.resolve({ result: [{ id: 42 }] }));

        it('should get the jwt using select and the specified selector', () => {
            const saga = fetchSagaFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);

            expect(saga.next().value).toEqual(select(jwtSelector));
        });

        it('should call the specified fetch function', () => {
            const saga = fetchSagaFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);
            saga.next();

            expect(saga.next('token').value).toEqual(call(successfullFetch, { jwt: 'token' }));
        });

        it('should call the specified fetch function with payload if any', () => {
            const saga = fetchSagaFactory(actions, successfullFetch, jwtSelector)(actionWithPayload);
            saga.next();

            expect(saga.next('token').value).toEqual(call(successfullFetch, { jwt: 'token', id: 'entityId' }));
        });

        it('should put the actions.success action with response result on successfull fetch', () => { // eslint-disable-line max-len
            const saga = fetchSagaFactory(actions, successfullFetch, jwtSelector)(actionWithoutPayload);

            saga.next({});
            saga.next();

            expect(saga.next({
                result: [{ id: 42 }],
            }).value).toEqual(put(actions.success([{ id: 42 }])));
        });

        it('should put the actions.failure action with error on failed fetch', () => {
            const error = new Error('Run you fools');
            const fetch = createSpy().andReturn(Promise.resolve({ error }));
            const saga = fetchSagaFactory(actions, fetch, jwtSelector)(actionWithoutPayload);

            saga.next();
            saga.next();

            expect(saga.next({
                error,
            }).value).toEqual(put(actions.failure(error)));
        });
    });

    describe('takeEveryRequestSagaFactory', () => {
        it('should take every action of type REQUEST', () => {
            const saga = takeEveryRequestSagaFactory({
                REQUEST: 'test/REQUEST',
            })();
            const fetch = createSpy().andReturn(Promise.resolve({ result: [{ id: 42 }] }));
            const fetchSaga = fetchSagaFactory(actions.list, fetch, jwtSelector);

            expect(saga.next()).toEqual(takeEvery('test/REQUEST', fetchSaga).next()); // eslint-disable-line max-len
        });
    });
});
