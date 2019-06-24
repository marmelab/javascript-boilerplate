/* eslint require-yield: off, func-names: off */
import expect, { createSpy } from 'expect';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';

import {
    getUserFromToken,
    signIn as signInSagaFactory,
    signOut as signOutSagaFactory,
} from './sagas';
import {
    signIn as signInActions,
    signOut as signOutActions,
} from './actions';

describe('userSagas', () => {
    const fetchSaga = () => Promise.resolve();

    describe('signIn', () => {
        const storeLocalUser = createSpy();
        const signInSaga = signInSagaFactory(fetchSaga, storeLocalUser);

        it('should call the fetchSaga function after a SIGN_IN action', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next().value).toEqual(call(fetchSaga, {
                payload: {
                    body: {
                        email: 'test_email',
                        password: 'test_password',
                    },
                },
            }));
        });

        it('should call the getUserFromToken function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            expect(saga.next({ result: { token: 'foo' } }).value).toEqual(call(getUserFromToken, 'foo'));
        });

        it('should call the signInActions.success function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();
            saga.next({ result: { token: 'foo' } });

            expect(saga.next({ id: 'foo' }).value).toEqual(put(signInActions.success({ id: 'foo' })));
        });

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();
            saga.next({ result: { token: 'foo' } });
            saga.next({ id: 'foo' });

            expect(saga.next().value).toEqual(call(storeLocalUser, { id: 'foo' }));
        });

        it('should put the routerActions.push action after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();
            saga.next({ result: { id: 'foo' } });
            saga.next({ id: 'foo' });
            saga.next();

            expect(saga.next().value).toEqual(put(routerActions.push('/next-route')));
        });
    });

    describe('signOut', () => {
        const removeLocalUser = createSpy();
        const signOutSaga = signOutSagaFactory(removeLocalUser);

        it('should call the removeLocalUser function', () => {
            const saga = signOutSaga(signOutActions.request());

            expect(saga.next().value).toEqual(call(removeLocalUser));
        });

        it('should put the signedOut action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();

            expect(saga.next().value).toEqual(put(signOutActions.success()));
        });

        it('should put the routerActions.push action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();
            saga.next();

            expect(saga.next().value).toEqual(put(routerActions.push('/sign-in')));
        });
    });
});
