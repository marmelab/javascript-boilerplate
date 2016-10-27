export default `
    type Product {
        id: ID!
        reference: String!
        width: Float!
        height: Float!
        price: Float!
        thumbnail: String!
        image: String!
        description: String!
        stock: Int!
        orderedTimes: Int
    }
`;
