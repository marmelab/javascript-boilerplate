import OrderSchema from '../orders/schema';
import ProductSchema from '../products/schema';

const OrderProductSchema = `
    type OrderProduct {
        id: ID!
        reference: String!
        width: Float!
        height: Float!
        price: Float!
        thumbnail: String!
        image: String!
        description: String!
        stock: Int!
        order_id: ID!
        order: Order!
        product_id: ID!
        originalProduct: Product!
        quantity: Int!
    }
`;

export default () => [OrderProductSchema, OrderSchema, ProductSchema];
