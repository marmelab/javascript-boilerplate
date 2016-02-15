/* globals API_URL */
export function fetchOrders(authorizationToken) {
    return fetch(`${API_URL}/orders`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': authorizationToken,
        },
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
