import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { signIn as signInSaga, signOut as signOutSaga, signUp as signUpSaga } from './userSagas';
import { userActionTypes, signIn as signInActions, signOut as signOutActions, signUp as signUpActions } from './userActions';
import { routeActions } from 'react-router-redux';

describe('userSagas', () => {
    describe('signIn', () => {
        it('should starts on SIGN_IN action', () => {
            const saga = signInSaga();

            expect(saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(take(userActionTypes.signIn.REQUEST));
        });

        it('should call the fetchSignIn function after a SIGN_IN action', () => {
            const fetchSignIn = sinon.spy();
            const saga = signInSaga(fetchSignIn);

            saga.next();

            expect(saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(call(fetchSignIn, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const fetchSignIn = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchSignIn, storeLocalUser);

            saga.next();

            saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next({
                user: { id: 'foo' },
            }).value).to.deep.equal(call(storeLocalUser, { id: 'foo'}));
        });

        it('should put the routeActions.push action after a succesfull signIn', () => {
            const fetchSignIn = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchSignIn, storeLocalUser);

            saga.next();
            saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            saga.next({
                user: { id: 'foo'},
            });

            expect(saga.next().value).to.deep.equal(put(signInActions.success({ id: 'foo'})));
        });

        it('should put the signedIn action after a succesfull signIn', () => {
            const fetchSignIn = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchSignIn, storeLocalUser);

            saga.next();
            saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            saga.next({
                user: { id: 'foo'},
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/next-route')));
        });

        it('should put the signIn action with error after a failed signIn', () => {
            const fetchSignIn = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signInSaga(fetchSignIn, storeLocalUser);
            const error = new Error('Run you fools!');

            saga.next();
            saga.next(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(signInActions.failure(error)));
        });
    });

    describe('signUp', () => {
        it('should starts on SIGN_UP action', () => {
            const saga = signUpSaga();

            expect(saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(take(userActionTypes.signUp.REQUEST));
        });

        it('should call the fetchSignUp function after a SIGN_UP action', () => {
            const fetchSignUp = sinon.spy();
            const saga = signUpSaga(fetchSignUp);

            saga.next();

            expect(saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            })).value).to.deep.equal(call(fetchSignUp, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull signUp', () => {
            const fetchSignUp = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signUpSaga(fetchSignUp, storeLocalUser);

            saga.next();

            saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next({
                user: { id: 'foo' },
            }).value).to.deep.equal(call(storeLocalUser, { id: 'foo'}));
        });

        it('should put the routeActions.push action after a succesfull signUp', () => {
            const fetchSignUp = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signUpSaga(fetchSignUp, storeLocalUser);

            saga.next();
            saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            saga.next({
                user: { id: 'foo'},
            });

            expect(saga.next().value).to.deep.equal(put(signUpActions.success({ id: 'foo'})));
        });

        it('should put the signedIn action after a succesfull signUp', () => {
            const fetchSignUp = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signUpSaga(fetchSignUp, storeLocalUser);

            saga.next();
            saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            saga.next({
                user: { id: 'foo'},
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/next-route')));
        });

        it('should put the signUp action with error after a failed signUp', () => {
            const fetchSignUp = sinon.spy();
            const storeLocalUser = sinon.spy();
            const saga = signUpSaga(fetchSignUp, storeLocalUser);
            const error = new Error('Run you fools!');

            saga.next();
            saga.next(signUpActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(signUpActions.failure(error)));
        });
    });

    describe('signOut', () => {
        it('should starts on SIGN_OUT action', () => {
            const saga = signOutSaga();

            expect(saga.next(signOutActions.request()).value).to.deep.equal(take(userActionTypes.signOut.REQUEST));
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

            expect(saga.next().value).to.deep.equal(put(signOutActions.success()));
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
