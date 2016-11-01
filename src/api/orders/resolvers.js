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
            return orderRepository.selectByUserId(limit, offset, user.id, sort, sortDir);
        },
    },

    Mutation: {
        async postOrder(root, { products }, { orderRepository, productRepository, user }) {
            if (!user) {
                return {
                    error: {
                        code: 'not_authorized',
                        message: 'Not authorized',
                        status: 401,
                    },
                };
            }
            const sanitizedProducts = await Promise.all(products.map(p => sanitizeProduct(p, productRepository)));
            const total = sanitizedProducts.reduce((t, p) => t + (p.price * (p.quantity || 1)), 0);

            const order = await orderRepository.insertOne({
                customer_id: user.id,
                date: new Date(),
                products: sanitizedProducts,
                reference: uuid.v4(),
                status: OrderStatus.pending,
                total,
            });

            return { order };
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
