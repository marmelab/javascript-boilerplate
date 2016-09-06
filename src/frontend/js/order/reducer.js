import { createEntityReducer } from '../app/entities/reducers';
import { orderActionTypes } from '../order/actions';

export default createEntityReducer(orderActionTypes);

export const getOrderById = (state, orderId) =>
    (state.order.list.length ? undefined : state.order.list.find(p => p.id === orderId));
