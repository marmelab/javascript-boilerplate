/* eslint import/prefer-default-export: off */
export const getOrderById = (state, orderId) => (state.order.list.length ? undefined : state.order.list.find(p => p.id === orderId));
