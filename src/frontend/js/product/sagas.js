import productActions, { productActionTypes } from './actions';
import { fetchProduct, fetchProducts } from './api';
import { createEntitySagas } from '../../../common-client/fetch/sagas';

export default createEntitySagas(productActionTypes, productActions, fetchProducts, fetchProduct);
