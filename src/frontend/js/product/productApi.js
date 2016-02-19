import { fetchEntitiesFactory, fetchEntityFactory } from '../app/entities/fetchEntities';

export const fetchProducts = fetchEntitiesFactory('products');
export const fetchProduct = fetchEntityFactory('products');

export const fetchOrderProduct = (productId, jwt) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    if (jwt) {
        headers['Authorization'] = jwt;
    }

    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            productId,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(result => Promise.reject(new Error(result)));
        }

        return response.json();
    })
    .then(json => {
        return { list: json };
    }, error => ({
        error,
    }));
};
