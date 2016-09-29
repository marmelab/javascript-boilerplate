/* eslint require-yield: off, func-names: off */
import expect from 'expect';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';

import {
    signIn as signInSagaFactory,
    signOut as signOutSagaFactory,
    signUp as signUpSagaFactory,
} from './sagas';
import {
    signIn as signInActions,
    signOut as signOutActions,
    signUp as signUpActions,
} from './actions';

describe('userSagas', () => {
    const fetchSaga = function* () { return; };

    describe('signIn', () => {
        const storeLocalUser = sinon.spy();
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

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            expect(saga.next({ result: { id: 'foo' } }).value).toEqual(call(storeLocalUser, { id: 'foo' }));
        });

        it('should put the routerActions.push action after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            saga.next({
                result: { id: 'foo' },
            });

            expect(saga.next().value).toEqual(put(routerActions.push('/next-route')));
        });
    });

    describe('signUp', () => {
        const storeLocalUser = sinon.spy();
        const signUpSaga = signUpSagaFactory(fetchSaga, storeLocalUser);

        it('should call the fetchSaga function after a SIGN_UP action', () => {
            const saga = signUpSaga(signUpActions.request('/next-route', {
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

        it('should call the storeLocalUser function after a succesfull signUp', () => {
            const saga = signUpSaga(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            expect(saga.next({ result: { id: 'foo' } }).value).toEqual(call(storeLocalUser, { id: 'foo' }));
        });

        it('should put the routerActions.push action after a succesfull signUp', () => {
            const saga = signUpSaga(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();
            saga.next({
                result: { id: 'foo' },
            });

            expect(saga.next().value).toEqual(put(routerActions.push('/next-route')));
        });
    });

    describe('signOut', () => {
        const removeLocalUser = sinon.spy();
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

            expect(saga.next().value).toEqual(put(routerActions.push('/')));
        });
    });
});
