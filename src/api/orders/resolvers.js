import uuid from 'uuid';
import { OrderStatus } from './orderModel';

const sanitizeProduct = async (product, productQueries) => {
    const productFromDb = await productQueries.selectOne({ id: product.id });
    return Object.assign({}, product, productFromDb);
};

export default {
    Query: {
        order(root, { id }, { orderRepository, user }) {
            return orderRepository.selectOne({ id, customer_id: user.id });
        },
        orders(root, { limit, offset, filter, sort, sortDir }, { orderRepository, user }) {
            return orderRepository.selectPage(limit, offset, filter, sort, sortDir, { customer_id: user.id });
        },
    },

    Mutation: {
        async postOrder(root, { products }, { orderRepository, productRepository, user }) {
            if (!user) {
                const error = new Error('Not authorized');
                error.status = 401;
                throw error;
            }
            const sanitizedProducts = await Promise.all(products.map(p => sanitizeProduct(p, productRepository)));
            const total = sanitizedProducts.reduce((t, p) => t + (p.price * (p.quantity || 1)), 0);

            const order = {
                customer_id: user.id,
                date: new Date(),
                products: sanitizedProducts,
                reference: uuid.v4(),
                status: OrderStatus.pending,
                total,
            };

            return orderRepository.insertOne(order);
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
