export default {
    OrderProduct: {
        order(root, args, { orderRepository }) {
            return orderRepository.selectOneById(root.order_id);
        },
        originalProduct(root, args, { productRepository }) {
            return productRepository.selectOneById(root.product_id);
        },
    },
};
