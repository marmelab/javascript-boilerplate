import UserSchema from '../users/schema';
import OrderProductSchema from '../order-products/schema';

const OrderSchema = `
    type Order {
        id: ID!
        reference: String!
        date: Date!
        customer_id: ID!
        customer: User!
        total: Float!
        status: String!,
        products: [OrderProduct]
    }

    input PostOrderItem {
        id: ID!
        quantity: Int!
    }
`;

export default () => [UserSchema, OrderProductSchema, OrderSchema];
