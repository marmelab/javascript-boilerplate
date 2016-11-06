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

    type PostOrderResult {
        order: Order
        error: Error
    }

    extend type Query {
        order(id: ID!): Order
        orders(limit: Int, offset: Int, filter: String, sort: String, sortDir: String): [Order]
    }

    extend type Mutation {
        postOrder(products: [PostOrderItem]): PostOrderResult
    }
`;

export default () => [UserSchema, OrderProductSchema, OrderSchema];
