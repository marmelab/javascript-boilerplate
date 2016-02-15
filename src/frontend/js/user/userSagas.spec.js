import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga';
import { signIn as signInSaga, signOut as signOutSaga } from './userSagas';
import { SIGN_IN, SIGN_OUT, signIn, signOut, signedIn, signedOut } from './userActions';
import { routeActions } from 'react-router-redux';

describe('userSagas', () => {
    describe('signIn', () => {
        it('should starts on SIGN_IN action', () => {
            const saga = signInSaga();

            expect(saga.next(signIn('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(take(SIGN_IN));
        });

        it('should call the fetchLogin function after a SIGN_IN action', () => {
            const fetchLogin = sinon.spy();
            const saga = signInSaga(fetchLogin);

            saga.next();

            expect(saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: SIGN_IN,
            }).value).to.deep.equal(call(fetchLogin, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: SIGN_IN,
            });

            expect(saga.next({
                status: 200,
                user: { id: 'foo'},
            }).value).to.deep.equal(call(storeLocalUser, { id: 'foo'}));
        });

        it('should put the routeActions.push action after a succesfull signIn', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: SIGN_IN,
            });
            saga.next({
                status: 200,
                user: { id: 'foo'},
            });

            expect(saga.next().value).to.deep.equal(put(signedIn({ id: 'foo'})));
        });

        it('should put the signedIn action after a succesfull signIn', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: SIGN_IN,
            });
            saga.next({
                status: 200,
                user: { id: 'foo'},
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/next-route')));
        });

        it('should put the signIn action with error after a failed signIn', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchLogin, storeLocalUser);
            const error = new Error('Run you fools!');

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: SIGN_IN,
            });

            expect(saga.next({
                status: 500,
                error,
            }).value).to.deep.equal(put(signedIn(error)));
        });
    });

    describe('signOut', () => {
        it('should starts on SIGN_OUT action', () => {
            const saga = signOutSaga();

            expect(saga.next(signOut()).value).to.deep.equal(take(SIGN_OUT));
        });

        it('should call the removeLocalUser function', () => {
            const removeLocalUser = sinon.spy();
            const saga = signOutSaga(removeLocalUser);

            saga.next();
            expect(saga.next().value).to.deep.equal(call(removeLocalUser));
        });

        it('should put the signedOut action', () => {
            const removeLocalUser = sinon.spy();
            const saga = signOutSaga(removeLocalUser);

            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(signedOut()));
        });

        it('should put the routeActions.push action', () => {
            const removeLocalUser = sinon.spy();
            const saga = signOutSaga(removeLocalUser);

            saga.next();
            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/')));
        });
    });
});
