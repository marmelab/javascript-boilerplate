import { userActionTypes } from './actions';

export default function (localStorage) {
    const notExpired = localStorage.getItem('expires') > (new Date()).getTime();
    const authenticated = !!localStorage.getItem('token') && notExpired;

    const initialState = {
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        expires: localStorage.getItem('expires'),
        authenticated,
        loading: false,
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
        case userActionTypes.signIn.REQUEST:
            return {
                ...state,
                authenticated: false,
                error: false,
                loading: true,
            };
        case userActionTypes.signIn.SUCCESS:
            return {
                ...state,
                ...payload,
                authenticated: true,
                error: false,
                loading: false,
            };

        case userActionTypes.signIn.FAILURE:
            return {
                ...state,
                authenticated: false,
                email: null,
                error: payload,
                id: null,
                loading: false,
                token: null,
                expires: null,
            };

        case userActionTypes.signOut.SUCCESS:
            return {
                ...state,
                authenticated: false,
                email: null,
                id: null,
                loading: false,
                token: null,
                expires: null,
            };
        default:
            return state;
        }
    };
}

export const getPreviousRoute = state => {
    if (state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.state) {
        return state.routing.locationBeforeTransitions.state.nextPathname;
    }

    return '/';
};
