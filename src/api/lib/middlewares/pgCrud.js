/* eslint no-param-reassign: off, max-len: off */
import Koa from 'koa';
import koaRoute from 'koa-route';

export default (queriesFactory, configuredMethods = {}) => {
    const app = new Koa();
    const defaultMethods = {
        GET: 'managed',
        POST: 'managed',
        PUT: 'managed',
        DELETE: 'managed',
    };

    let queries;

    app.use(async (ctx, next) => {
        ctx.availableMethods = Object.assign({}, defaultMethods, configuredMethods);

        await next();
    });

    app.use(async (ctx, next) => {
        queries = queriesFactory(ctx.client);
        await next();
    });

    // GET /
    app.use(koaRoute.get('/', async (ctx, next) => {
        if (ctx.availableMethods.GET) {
            const query = ctx.request.query;
            const excludedQueryParams = ['limit', 'offset', 'filter', '_sort', '_sortDir'];
            const other = {};
            Object.keys(query).forEach(key => {
                if (excludedQueryParams.indexOf(key) !== -1) return;
                other[key] = query[key];
            });

            ctx.body = await queries.selectPage(query.limit, query.offset, query.filter, query._sort, query._sortDir, other); // eslint-disable-line no-underscore-dangle
            const totalCount = (ctx.body[0]) ? ctx.body[0].totalcount : (await queries.countAll());
            ctx.set('X-Total-Count', totalCount);
            ctx.set('Access-Control-Expose-Headers', 'X-Total-Count');
        }

        if (ctx.availableMethods.GET !== 'managed') {
            await next();
        }
    }));

    // GET /:id
    app.use(koaRoute.get('/:id', async (ctx, id, next) => {
        if (ctx.availableMethods.GET) {
            try {
                ctx.body = await queries.selectOne({ id });
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
    }));

    // POST /
    app.use(koaRoute.post('/', async (ctx, next) => {
        if (ctx.availableMethods.POST) {
            const data = ctx.data || ctx.request.body;
            ctx.body = await queries.insertOne(data);
        }

        if (ctx.availableMethods.POST !== 'managed') {
            await next();
        }
    }));

    // POST /multi
    app.use(koaRoute.post('/multi', async (ctx, next) => {
        if (ctx.availableMethods.POST) {
            const data = ctx.data || ctx.request.body;
            ctx.body = await queries.batchInsert(data);
        }

        if (ctx.availableMethods.POST !== 'managed') {
            await next();
        }
    }));

    // DELETE /
    app.use(koaRoute.delete('/:id', async (ctx, id, next) => {
        if (ctx.availableMethods.DELETE) {
            try {
                ctx.body = await queries.deleteOne(id);
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
    }));

    // DELETE /multi
    app.use(koaRoute.delete('/multi', async (ctx, next) => {
        if (ctx.availableMethods.DELETE) {
            const ids = ctx.query.id;
            ctx.body = await queries.batchDelete(ids);
        }
        if (ctx.availableMethods.DELETE !== 'managed') {
            await next();
        }
    }));

    // PUT /:id
    app.use(koaRoute.put('/:id', async (ctx, id, next) => {
        if (ctx.availableMethods.PUT) {
            const data = ctx.data || ctx.request.body;
            let modifiedEntity;
            try {
                modifiedEntity = await queries.updateOne(id, data);
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
    }));

    return app;
};
