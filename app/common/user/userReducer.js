const initialState = {
    id: window.sessionStorage.getItem('id'),
    email: window.sessionStorage.getItem('email'),
    token: window.sessionStorage.getItem('token'),
};

export default function actions(state = initialState, { type, payload }) {
    return state;
}
