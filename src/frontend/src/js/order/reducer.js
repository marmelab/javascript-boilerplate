import { createEntityReducer } from '../../../../common/fetch/reducers';
import { orderActionTypes } from './actions';

export default createEntityReducer(orderActionTypes);

export const getOrderById = (state, orderId) =>
    (state.order.list.length ? undefined : state.order.list.find(p => p.id === orderId));
