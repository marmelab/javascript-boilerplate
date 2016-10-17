/* globals API_URL */
import fetchFactory from '../../../isomorphic/fetch/fetch';

export const fetchProducts = fetchFactory(`${API_URL}/products`);
export const fetchProduct = fetchFactory(`${API_URL}/products`);
