import productActions, { productActionTypes } from './productActions';
import { fetchProduct, fetchProducts } from './productApi';
import { entityFactory } from '../app/entities/sagas';

export default entityFactory(productActionTypes, productActions, fetchProducts, fetchProduct);
