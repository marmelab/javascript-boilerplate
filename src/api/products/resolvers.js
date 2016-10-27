export default {
    Query: {
        products(root, { limit, offset, filter, sort, sortDir }, { productRepository }) {
            return productRepository.selectPage(limit, offset, filter, sort, sortDir);
        },
    },

    Product: {
        async orderedTimes(root, args, { orderProductRepository }) {
            const orderProducts = await orderProductRepository.selectByProductId(root.id);

            return orderProducts.reduce((total, orderProduct) => total + orderProduct.quantity, 0);
        },
    },
};
