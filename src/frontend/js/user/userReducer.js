import { SIGNED_IN, SIGNED_OUT } from './userActions';

export default function(sessionStorage) {
    const initialState = {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        token: sessionStorage.getItem('token'),
        authenticated: !!sessionStorage.getItem('token'),
    };

    return (state = initialState, { type, payload, error }) => {
        switch (type) {
        case SIGNED_IN:
            if (!error) {
                return {
                    ...state,
                    ...payload,
                    authenticated: true,
                    error: false,
                };
            }

            return {
                ...state,
                authenticated: false,
                error: payload,
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
