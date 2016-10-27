import Koa from 'koa';
import merge from 'lodash.merge';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import koaMount from 'koa-mount';

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

const rootQuery = `
type Query {
    products(limit: Int, offset: Int, filter: String, sort: String, sortDir: String): [Product]
    orders(customer_id: ID!): [Order]
}
`;

const rootSchema = `
schema {
    query: Query
}
`;

const schema = makeExecutableSchema({
    typeDefs: [
        rootSchema,
        rootQuery,
        UserSchema,
        ProductSchema,
        OrderSchema,
        OrderProductSchema,
        DateSchema,
    ],
    resolvers: merge(UserResolvers, ProductResolvers, OrderResolvers, OrderProductResolvers, DateResolver),
});

app.use(async (ctx, next) => {
    ctx.repositoriesMap = {
        orderRepository: orderRepository(ctx.client),
        orderProductRepository: orderProductRepository(ctx.client),
        productRepository: productRepository(ctx.client),
        userRepository: userRepository(ctx.client),
    };

    await next();
});

app.use(koaMount('/graphql', async (ctx, next) => graphqlKoa({
    context: ctx.repositoriesMap,
    schema,
})(ctx, next)));

app.use(koaMount('/graphiql', graphiqlKoa({
    endpointURL: '/graphql',
})));

export default app;
