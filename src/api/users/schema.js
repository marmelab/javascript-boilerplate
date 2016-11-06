import OrderSchema from '../orders/schema';

const UserSchema = `
type User {
    id: ID!
    email: String!
    orders: [Order]
}
`;

export default () => [OrderSchema, UserSchema];
