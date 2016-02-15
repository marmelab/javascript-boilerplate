import { SIGNED_IN, SIGNED_OUT } from './userActions';

export default function(sessionStorage) {
    const initialState = {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        token: sessionStorage.getItem('token'),
        authenticated: !!sessionStorage.getItem('token'),
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {
        case SIGNED_IN:
            return {
                ...state,
                ...payload,
                authenticated: true,
            };
        case SIGNED_OUT:
            return {
                ...state,
                id: undefined,
                email: undefined,
                token: undefined,
                authenticated: false,
            };
        default:
            return state;
        }
    };
}
