/* globals API_URL */
export function fetchProducts() {
    return fetch(`${API_URL}/products`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }

        return { products: json };
    }, error => ({
        error,
    }));
}

export function fetchProduct(id) {
    return fetch(`${API_URL}/products/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
        }

        return { product: json };
    }, error => ({
        error,
    }));
}
