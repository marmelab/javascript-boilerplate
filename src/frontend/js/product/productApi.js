/* globals API_URL */
export function fetchProducts() {
    return fetch(`${API_URL}/products`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(result => Promise.reject(new Error(result)));
        }

        return response.json();
    })
    .then(json => {
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
    .then(response => {
        if (!response.ok) {
            return response.text().then(result => Promise.reject(new Error(result)));
        }

        return response.json();
    })
    .then(json => {
        return { product: json };
    }, error => ({
        error,
    }));
}
