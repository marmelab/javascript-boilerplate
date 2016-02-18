/* globals API_URL */
export function fetchOrders(authorizationToken) {
    return fetch(`${API_URL}/orders`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': authorizationToken,
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(result => Promise.reject(new Error(result)));
        }

        return response.json();
    })
    .then(json => {
        return { orders: json };
    }, error => ({
        error,
    }));
}
