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

    extend type Query {
        product(id: ID!): Product
        products(limit: Int, offset: Int, filter: String, sort: String, sortDir: String): [Product]
    }
`;
