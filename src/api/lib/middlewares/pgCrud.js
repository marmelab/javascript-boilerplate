/* eslint func-names:0*/

import koa from 'koa';
import coBody from 'co-body';
import koaRoute from 'koa-route';

export default (queriesFactory, configuredMethods = {}) => {
    const app = koa();
    const defaultMethods = {
        GET: 'managed',
        POST: 'managed',
        PUT: 'managed',
        DELETE: 'managed',
    };

    let queries;

    app.use(function* (next) {
        this.availableMethods = { ...defaultMethods, ...configuredMethods };

        yield next;
    });

    app.use(function* (next) {
        queries = queriesFactory(this.client);
        yield next;
    });

    // GET /
    app.use(koaRoute.get('/', function* (next) {
        if (this.availableMethods.GET) {
            const query = this.request.query;
            const excludedQueryParams = ['limit', 'offset', 'filter', '_sort', '_sortDir'];
            const other = {};
            Object.keys(query).forEach(key => {
                if (excludedQueryParams.indexOf(key) !== -1) return;
                other[key] = query[key];
            });

            this.body = yield queries.selectPage(query.limit, query.offset, query.filter, query._sort, query._sortDir, other);
            const totalCount = (this.body[0]) ? this.body[0].totalcount : (yield queries.countAll());
            this.set('X-Total-Count', totalCount);
            this.set('Access-Control-Expose-Headers', 'X-Total-Count');
        }

        if (this.availableMethods.GET !== 'managed') {
            yield next;
        }
    }));

    // GET /:id
    app.use(koaRoute.get('/:id', function* (id, next) {
        if (this.availableMethods.GET) {
            try {
                this.body = yield queries.selectOneById(id);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                } else {
                    throw e;
                }
            }
        }
        if (this.availableMethods.GET !== 'managed') {
            yield next;
        }
    }));

    // POST /
    app.use(koaRoute.post('/', function* (next) {
        if (this.availableMethods.POST) {
            const data = this.data || (yield coBody(this));
            this.body = yield queries.insertOne(data);
        }

        if (this.availableMethods.POST !== 'managed') {
            yield next;
        }
    }));

    // POST /multi
    app.use(koaRoute.post('/multi', function* (next) {
        if (this.availableMethods.POST) {
            const data = this.data || (yield coBody(this));
            this.body = yield queries.batchInsert(data);
        }

        if (this.availableMethods.POST !== 'managed') {
            yield next;
        }
    }));

    // DELETE /
    app.use(koaRoute.delete('/:id', function* (id, next) {
        if (this.availableMethods.DELETE) {
            try {
                this.body = yield queries.removeOne(id);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                } else {
                    throw e;
                }
            }
        }

        if (this.availableMethods.DELETE !== 'managed') {
            yield next;
        }
    }));

    // DELETE /multi
    app.use(koaRoute.delete('/multi', function* (next) {
        if (this.availableMethods.DELETE) {
            const ids = this.query.id;
            this.body = yield queries.batchDelete(ids);
        }
        if (this.availableMethods.DELETE !== 'managed') {
            yield next;
        }
    }));

    // PUT /:id
    app.use(koaRoute.put('/:id', function* (id, next) {
        if (this.availableMethods.PUT) {
            const data = this.data || (yield coBody(this));
            let modifiedEntity;
            try {
                modifiedEntity = yield queries.updateOne(id, data);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                    return;
                }

                throw e;
            }
            this.body = modifiedEntity;
        }

        if (this.availableMethods.PUT !== 'managed') {
            yield next;
        }
    }));

    return app;
};
