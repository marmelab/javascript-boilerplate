/* globals API_URL */
import fetchFactory from '../../../common/fetch/fetch';

export const fetchProducts = fetchFactory(`${API_URL}/products`);
export const fetchProduct = fetchFactory(`${API_URL}/products`);
