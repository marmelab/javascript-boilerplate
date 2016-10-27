export default {
    Query: {
        orders(root, { customer_id, limit, offset, filter, sort, sortDir }, { orderRepository }) {
            return orderRepository.selectPage(limit, offset, filter, sort, sortDir, { customer_id });
        },
    },

    Order: {
        customer(root, args, { userRepository }) {
            return userRepository.selectOneById(root.customer_id);
        },
        products(root, args, { orderProductRepository }) {
            return orderProductRepository.selectByOrderId(root.id);
        },
    },
};
