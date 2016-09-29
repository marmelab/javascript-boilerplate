/* globals API_URL */
import fetchFactory from 'isomorphic/fetch/fetch';

export const fetchOrders = fetchFactory('orders');
export const fetchOrder = fetchFactory('orders');
export const fetchNewOrder = fetchFactory('orders', 'POST');
