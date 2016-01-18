export default function(sessionStorage) {
    const initialState = {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        token: sessionStorage.getItem('token'),
    };

    return (state = initialState) => {
        return state;
    };
}
