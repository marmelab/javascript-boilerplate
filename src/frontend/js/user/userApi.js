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
    .then(response => {
        if (!response.ok) {
            return response.text().then(result => Promise.reject(new Error(result)));
        }

        return response.json();
    })
    .then(json => {
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
