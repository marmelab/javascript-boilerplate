export const getProductById = (state, productId) => (state.product.list.length ? undefined : state.product.list.find(p => p.id === productId));
