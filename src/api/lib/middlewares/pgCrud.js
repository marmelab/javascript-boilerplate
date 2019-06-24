/* eslint no-param-reassign: off, max-len: off */
import Koa from 'koa';
import koaRoute from 'koa-route';

export const defaultMethods = {
    GET: 'managed',
    POST: 'managed',
    PUT: 'managed',
    DELETE: 'managed',
};

export const pgCrudFactory = (repositoryFactory, configuredMethods = {}) => ({
    initialize: async (ctx, next) => {
        ctx.availableMethods = Object.assign({}, defaultMethods, configuredMethods);
        ctx.repository = repositoryFactory(ctx.client);

        await next();
    },

    get: async (ctx, next) => {
        if (ctx.availableMethods.GET) {
            const query = ctx.request.query;
            const excludedQueryParams = ['limit', 'offset', 'filter', '_sort', '_sortDir'];
            const other = {};
            Object.keys(query).forEach((key) => {
                if (excludedQueryParams.indexOf(key) !== -1) return;
                other[key] = query[key];
            });

            ctx.body = await ctx.repository.selectPage(query.limit, query.offset, query.filter, query._sort, query._sortDir, other); // eslint-disable-line no-underscore-dangle
            const totalCount = (ctx.body[0]) ? ctx.body[0].totalcount : (await ctx.repository.countAll()).count;
            ctx.set('X-Total-Count', totalCount);
            ctx.set('Access-Control-Expose-Headers', 'X-Total-Count');
        }

        if (ctx.availableMethods.GET !== 'managed') {
            await next();
        }
    },

    getById: async (ctx, id, next) => {
        if (ctx.availableMethods.GET) {
            try {
                ctx.body = await ctx.repository.selectOne({ id });
            } catch (e) {
                if (e.message === 'not found') {
                    ctx.status = 404;
                } else {
                    throw e;
                }
            }
        }
        if (ctx.availableMethods.GET !== 'managed') {
            await next();
        }
    },

    post: async (ctx, next) => {
        if (ctx.availableMethods.POST) {
            const data = ctx.data || ctx.request.body;
            ctx.body = await ctx.repository.insertOne(data);
        }

        if (ctx.availableMethods.POST !== 'managed') {
            await next();
        }
    },

    postMulti: async (ctx, next) => {
        if (ctx.availableMethods.POST) {
            const data = ctx.data || ctx.request.body;
            ctx.body = await ctx.repository.batchInsert(data);
        }

        if (ctx.availableMethods.POST !== 'managed') {
            await next();
        }
    },

    delete: async (ctx, id, next) => {
        if (ctx.availableMethods.DELETE) {
            try {
                ctx.body = await ctx.repository.deleteOne(id);
            } catch (e) {
                if (e.message === 'not found') {
                    ctx.status = 404;
                } else {
                    throw e;
                }
            }
        }

        if (ctx.availableMethods.DELETE !== 'managed') {
            await next();
        }
    },

    deleteMulti: async (ctx, next) => {
        if (ctx.availableMethods.DELETE) {
            const ids = ctx.query.id;
            ctx.body = await ctx.repository.batchDelete(ids);
        }
        if (ctx.availableMethods.DELETE !== 'managed') {
            await next();
        }
    },

    put: async (ctx, id, next) => {
        if (ctx.availableMethods.PUT) {
            const data = ctx.data || ctx.request.body;
            let modifiedEntity;
            try {
                modifiedEntity = await ctx.repository.updateOne(id, data);
            } catch (e) {
                if (e.message === 'not found') {
                    ctx.status = 404;
                    return;
                }

                throw e;
            }
            ctx.body = modifiedEntity;
        }

        if (ctx.availableMethods.PUT !== 'managed') {
            await next();
        }
    },
});

export default (repositoryFactory, configuredMethods = {}) => {
    const app = new Koa();

    const pgCrud = pgCrudFactory(repositoryFactory, configuredMethods);

    app.use(pgCrud.initialize);

    // GET /
    app.use(koaRoute.get('/', pgCrud.get));

    // GET /:id
    app.use(koaRoute.get('/:id', pgCrud.getById));

    // POST /
    app.use(koaRoute.post('/', pgCrud.post));

    // POST /multi
    app.use(koaRoute.post('/multi', pgCrud.postMulti));

    // DELETE /
    app.use(koaRoute.delete('/:id', pgCrud.delete));

    // DELETE /multi
    app.use(koaRoute.delete('/multi', pgCrud.deleteMulti));

    // PUT /:id
    app.use(koaRoute.put('/:id', pgCrud.put));

    return app;
};
