export default {
    User: {
        orders(root, args, { orderRepository }) {
            return orderRepository.selectByUserId(root.id);
        },
    },
};
