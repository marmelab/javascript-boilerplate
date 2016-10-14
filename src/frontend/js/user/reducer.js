import { userActionTypes } from './actions';

export const isAuthenticated = ({ user: { authenticated, expires } }) => {
    if (!authenticated) return false;

    if (expires < new Date()) return false;

    return true;
};

export default function (localStorage) {
    let authenticated = false;
    let expires;
    const expiresFromStorage = localStorage.getItem('expires');

    if (expiresFromStorage) {
        try {
            expires = new Date(parseFloat(expiresFromStorage) * 1000);
            const expired = expires < new Date();
            authenticated = !!localStorage.getItem('token') && !expired;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Error while parsing JWT token', error); // eslint-disable-line no-console
            }
        }
    }

    const initialState = {
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        expires,
        authenticated,
        loading: false,
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
        case userActionTypes.signIn.REQUEST:
        case userActionTypes.signUp.REQUEST:
            return {
                ...state,
                authenticated: false,
                error: false,
                loading: true,
            };
        case userActionTypes.signIn.SUCCESS:
        case userActionTypes.signUp.SUCCESS:
            return {
                ...state,
                ...payload,
                authenticated: true,
                error: false,
                loading: false,
            };

        case userActionTypes.signIn.FAILURE:
        case userActionTypes.signUp.FAILURE:
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

export const getPreviousRoute = (state) => {
    if (state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.state) {
        return state.routing.locationBeforeTransitions.state.nextPathname;
    }

    return '/';
};
