/* globals API_URL */
import fetchFactory from '../../../common-client/fetch/fetch';

export const fetchOrders = fetchFactory('orders');
export const fetchOrder = fetchFactory('orders');
export const fetchNewOrder = fetchFactory('orders', 'POST');
