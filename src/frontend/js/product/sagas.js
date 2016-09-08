import productActions, { productActionTypes } from './actions';
import { fetchProduct, fetchProducts } from './api';
import { entityFactory } from '../../../common-client/fetch/sagas';

export default entityFactory(productActionTypes, productActions, fetchProducts, fetchProduct);
