import productActions, { productActionTypes } from './actions';
import { fetchProduct, fetchProducts } from './api';
import { entityFactory } from '../app/entities/sagas';

export default entityFactory(productActionTypes, productActions, fetchProducts, fetchProduct);
