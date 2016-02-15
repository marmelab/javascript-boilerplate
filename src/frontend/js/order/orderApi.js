/* globals API_URL */
export function fetchOrders() {
    return fetch(`${API_URL}/orders`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': sessionStorage.getItem('token'), // TODO: this should probably be a function parameter
        },
    }).then(response => ({
        status: response.status,
        orders: response.json(),
    }), error => ({
        error,
    }));
}
