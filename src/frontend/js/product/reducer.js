import { createEntityReducer } from '../app/entities/reducers';
import { productActionTypes } from '../product/actions';

export default createEntityReducer(productActionTypes);

export const getProductById = (state, productId) =>
    (state.product.list.length ? undefined : state.product.list.find(p => p.id === productId));
