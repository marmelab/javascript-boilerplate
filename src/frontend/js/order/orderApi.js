/* globals API_URL */
import { fetchEntitiesFactory, fetchEntityFactory } from '../app/entities/fetchEntities';

export const fetchOrders = fetchEntitiesFactory('orders');
export const fetchOrder = fetchEntityFactory('orders');

export const fetchNewOrder = (products, jwt) => fetch(`${API_URL}/orders`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': jwt,
    },
    method: 'POST',
    body: JSON.stringify({
        products,
    }),
})
.then(response => {
    if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
})
.then(json => {
    return { order: json };
}, error => ({
    error,
}));
