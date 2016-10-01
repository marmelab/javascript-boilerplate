import { createEntityReducer } from '../../../isomorphic/fetch/reducers';
import { productActionTypes } from './actions';

export default createEntityReducer(productActionTypes);

export const getProductById = (state, productId) =>
    (state.product.list.length ? undefined : state.product.list.find(p => p.id === productId));
