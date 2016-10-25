import expect from 'expect';
import { signIn, signOut, userActionTypes } from './actions';

describe('userActions', () => {
    describe('.signIn', () => {
        it('.request should return the correct action', () => {
            expect(signIn.request('/route', {
                email: 'test_email',
                password: 'test_password',
            })).toEqual({
                type: userActionTypes.signIn.REQUEST,
                payload: {
                    previousRoute: '/route',
                    body: {
                        email: 'test_email',
                        password: 'test_password',
                    },
                },
            });
        });

        it('.success should return the correct action', () => {
            expect(signIn.success({
                id: 'id_test',
                email: 'test_email',
                token: 'test_token',
            })).toEqual({
                type: userActionTypes.signIn.SUCCESS,
                payload: { id: 'id_test', email: 'test_email', token: 'test_token' },
            });
        });

        it('.failure should return the correct action', () => {
            const error = new Error('Run you fools !');

            expect(signIn.failure(error)).toEqual({
                type: userActionTypes.signIn.FAILURE,
                payload: error,
                error: true,
            });
        });
    });

    describe('.signOut', () => {
        it('.request should return the correct action', () => {
            expect(signOut.request()).toEqual({
                type: userActionTypes.signOut.REQUEST,
            });
        });

        it('.success should return the correct action', () => {
            expect(signOut.success()).toEqual({
                type: userActionTypes.signOut.SUCCESS,
            });
        });
    });
});
