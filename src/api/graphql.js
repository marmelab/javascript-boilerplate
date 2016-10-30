/* eslint no-param-reassign: off */
import Koa from 'koa';
import merge from 'lodash.merge';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import koaMount from 'koa-mount';

import tokenCheckerMiddleware from './lib/middlewares/tokenChecker';
import { DateSchema, DateResolver } from './lib/graphql/date';

import orderRepository from './orders/orderModel';
import orderProductRepository from './order-products/orderProductModel';
import productRepository from './products/productModel';
import userRepository from './users/userModel';

import UserSchema from './users/schema';
import ProductSchema from './products/schema';
import OrderSchema from './orders/schema';
import OrderProductSchema from './order-products/schema';

import UserResolvers from './users/resolvers';
import ProductResolvers from './products/resolvers';
import OrderResolvers from './orders/resolvers';
import OrderProductResolvers from './order-products/resolvers';

const app = new Koa();

app.use(tokenCheckerMiddleware(false));

const rootQuery = `
type Query {
    product(id: ID!): Product
    products(limit: Int, offset: Int, filter: String, sort: String, sortDir: String): [Product]
    order(id: ID!): Order
    orders(limit: Int, offset: Int, filter: String, sort: String, sortDir: String): [Order]
}
`;

const rootMutation = `
type Mutation {
    postOrder(products: [PostOrderItem]): Order
}
`;

const rootSchema = `
schema {
    query: Query
    mutation: Mutation
}
`;

const schema = makeExecutableSchema({
    typeDefs: [
        rootSchema,
        rootQuery,
        rootMutation,
        UserSchema,
        ProductSchema,
        OrderSchema,
        OrderProductSchema,
        DateSchema,
    ],
    resolvers: merge(UserResolvers, ProductResolvers, OrderResolvers, OrderProductResolvers, DateResolver),
});

app.use(async (ctx, next) => {
    ctx.orderRepository = orderRepository(ctx.client);
    ctx.orderProductRepository = orderProductRepository(ctx.client);
    ctx.productRepository = productRepository(ctx.client);
    ctx.userRepository = userRepository(ctx.client);

    await next();
});

app.use(koaMount('/graphql', async (ctx, next) => graphqlKoa({
    context: ctx,
    schema,
})(ctx, next)));

app.use(koaMount('/graphiql', graphiqlKoa({
    endpointURL: '/api/graphql',
})));

export default app;
