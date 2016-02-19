import { userActionTypes } from './userActions';

export default function(localStorage) {
    const initialState = {
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        expires: localStorage.getItem('expires'),
        authenticated: !!localStorage.getItem('token') && localStorage.getItem('expires') > (new Date()).getTime(),
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
