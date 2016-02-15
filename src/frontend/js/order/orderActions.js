import { createAction } from 'redux-actions';

export const LOAD_ORDERS = 'LOAD_ORDERS';
export const loadOrders = createAction(LOAD_ORDERS);

export const ORDERS_LOADED = 'ORDERS_LOADED';
export const ordersLoaded = createAction(ORDERS_LOADED);
