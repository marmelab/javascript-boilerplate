import { userActionTypes } from './userActions';

export default function(sessionStorage) {
    const initialState = {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        token: sessionStorage.getItem('token'),
        authenticated: !!sessionStorage.getItem('token'),
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
            };

        case userActionTypes.signOut.SUCCESS:
            return {
                ...state,
                authenticated: false,
                email: null,
                id: null,
                loading: false,
                token: null,
            };
        default:
            return state;
        }
    };
}
