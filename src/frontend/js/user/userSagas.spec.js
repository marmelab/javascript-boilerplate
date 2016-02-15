import { expect } from 'chai';
import sinon from 'sinon';
import { call, fork, put, take } from 'redux-saga';
import { login as loginSaga, logout as logoutSaga } from './userSagas';
import { LOGIN, LOGOUT, login, logout, loginError, signedIn, signedOut } from './userActions';
import { routeActions } from 'react-router-redux';

describe('userSagas', () => {
    describe('login', () => {
        it('should starts on LOGIN action', () => {
            const saga = loginSaga();

            expect(saga.next(login('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(take(LOGIN));
        });

        it('should call the fetchLogin function after a LOGIN action', () => {
            const fetchLogin = sinon.spy();
            const saga = loginSaga(fetchLogin);

            saga.next();

            expect(saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: LOGIN,
            }).value).to.deep.equal(call(fetchLogin, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull login', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = loginSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: LOGIN,
            });

            expect(saga.next({
                status: 200,
                user: { id: 'foo'},
            }).value).to.deep.equal(call(storeLocalUser, { id: 'foo'}));
        });

        it('should put the routeActions.push action after a succesfull login', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = loginSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: LOGIN,
            });
            saga.next({
                status: 200,
                user: { id: 'foo'},
            });

            expect(saga.next().value).to.deep.equal(put(signedIn({ id: 'foo'})));
        });

        it('should put the signedIn action after a succesfull login', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = loginSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: LOGIN,
            });
            saga.next({
                status: 200,
                user: { id: 'foo'},
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/next-route')));
        });

        it('should put the loginError action after a failed login', () => {
            const fetchLogin = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = loginSaga(fetchLogin, storeLocalUser);

            saga.next();
            saga.next({
                payload: {
                    previousRoute: '/next-route',
                    email: 'test_email',
                    password: 'test_password',
                },
                type: LOGIN,
            });

            expect(saga.next({
                status: 500,
                error: 'Run you fools!',
            }).value).to.deep.equal(put(loginError('Run you fools!')));
        });
    });

    describe('logout', () => {
        it('should starts on LOGOUT action', () => {
            const saga = logoutSaga();

            expect(saga.next(logout()).value).to.deep.equal(take(LOGOUT));
        });

        it('should call the removeLocalUser function', () => {
            const removeLocalUser = sinon.spy();
            const saga = logoutSaga(removeLocalUser);

            saga.next();
            expect(saga.next().value).to.deep.equal(call(removeLocalUser));
        });

        it('should put the signedOut action', () => {
            const removeLocalUser = sinon.spy();
            const saga = logoutSaga(removeLocalUser);

            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(signedOut()));
        });

        it('should put the routeActions.push action', () => {
            const removeLocalUser = sinon.spy();
            const saga = logoutSaga(removeLocalUser);

            saga.next();
            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/')));
        });
    });
});
