import { expect } from 'chai';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';

import {
    signIn as signInSagaFactory,
    signOut as signOutSagaFactory,
} from './sagas';
import {
    signIn as signInActions,
    signOut as signOutActions,
} from './actions';

describe('userSagas', () => {
    describe('signIn', () => {
        const fetchSignIn = sinon.spy();
        const storeLocalUser = sinon.spy();
        const signInSaga = signInSagaFactory(fetchSignIn, storeLocalUser);

        it('should call the fetchSignIn function after a SIGN_IN action', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next().value).to
                .deep.equal(call(fetchSignIn, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            expect(saga.next({ user: { id: 'foo' } }).value).to
                .deep.equal(call(storeLocalUser, { id: 'foo' }));
        });

        it('should put the signedIn action after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            saga.next({
                user: { id: 'foo' },
            });

            expect(saga.next().value).to.deep.equal(put(signInActions.success({ id: 'foo' })));
        });

        it('should put the routerActions.push action after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            saga.next({
                user: { id: 'foo' },
            });

            saga.next();

            expect(saga.next().value).to.deep.equal(put(routerActions.push('/next-route')));
        });

        it('should put the signIn action with error after a failed signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            const error = new Error('Run you fools!');

            saga.next();
            expect(saga.next({
                error,
            }).value).to.deep.equal(put(signInActions.failure(error)));
        });
    });

    describe('signOut', () => {
        const removeLocalUser = sinon.spy();
        const signOutSaga = signOutSagaFactory(removeLocalUser);

        it('should call the removeLocalUser function', () => {
            const saga = signOutSaga(signOutActions.request());

            expect(saga.next().value).to.deep.equal(call(removeLocalUser));
        });

        it('should put the signedOut action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();

            expect(saga.next().value).to.deep.equal(put(signOutActions.success()));
        });

        it('should put the routerActions.push action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routerActions.push('/sign-in')));
        });
    });
});
