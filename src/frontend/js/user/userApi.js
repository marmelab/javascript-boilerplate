/* globals API_URL */
export function fetchLogin(email, password) {
    return fetch(`${API_URL}/authenticate`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(response => ({
        status: response.status,
        user: response.status === 200 && response.json(),
        error: response.status !== 200 && new Error(response.statusText),
    }), error => ({
        error,
    }));
}

export const storeLocalUser = ({ id, email, token }) => Promise.resolve(() => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
});

export const removeLocalUser = () => Promise.resolve(() => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
});
