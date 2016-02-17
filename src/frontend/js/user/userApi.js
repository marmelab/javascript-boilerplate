/* globals API_URL */
export function fetchLogin(email, password) {
    return fetch(`${API_URL}/sign-in`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }

        return { user: json };
    }, error => ({
        error,
    }));
}

export const storeLocalUser = ({ id, email, token }) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
};

export const removeLocalUser = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
};
