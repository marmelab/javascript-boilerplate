import { SIGNED_IN, SIGNED_OUT } from './userActions';

export default function(sessionStorage) {
    const initialState = {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        token: sessionStorage.getItem('token'),
        authenticated: !!sessionStorage.getItem('token'),
    };

    return (state = initialState, { type, user }) => {
        switch (type) {
        case SIGNED_IN:
            return {...state, ...user, authenticated: true };
        case SIGNED_OUT:
            return {...state, ...user, authenticated: false };
        default:
            return state;
        }
    };
}
