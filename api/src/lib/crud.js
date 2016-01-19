import koa from 'koa';
import coBody from 'co-body';
import koaRoute from 'koa-route';

export default (queries, restricted, excludedRouteMethod) => {
    const app = koa();
    let q;

    app.use(function* (next) {
        q = queries(this.client);
        yield next;
    });

    if (!excludedRouteMethod || excludedRouteMethod.indexOf('get') === -1) {
        app.use(koaRoute.get('/', function* () {
            if (restricted && restricted.indexOf('get') !== -1) {
                this.status = 403;
                this.body = {};
                return;
            }
            const query = this.request.query;
            const excludedQueryParams = ['limit', 'offset', 'filter', '_sort', '_sortDir'];
            const other = {};
            Object.keys(query).forEach(key => {
                if (excludedQueryParams.indexOf(key) !== -1) return;
                other[key] = query[key];
            });

            this.body = yield q.selectPage(query.limit, query.offset, query.filter, query._sort, query._sortDir, other);
            const totalCount = (this.body[0]) ? this.body[0].totalcount : (yield q.countAll());
            this.set('X-Total-Count', totalCount);
            this.set('Access-Control-Expose-Headers', 'X-Total-Count');
        }));

        app.use(koaRoute.get('/:id', function* (id) {
            if (restricted && restricted.indexOf('get') !== -1) {
                this.status = 403;
                this.body = {};
                return;
            }
            try {
                this.body = yield q.selectOneById(id);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                } else {
                    throw e;
                }
            }
        }));
    }

    if (!excludedRouteMethod || excludedRouteMethod.indexOf('post') === -1) {
        app.use(koaRoute.post('/', function* () {
            if (restricted && restricted.indexOf('post') !== -1) {
                this.status = 403;

                return;
            }
            const data = this.data || (yield coBody(this));
            this.body = yield q.insertOne(data);
        }));

        app.use(koaRoute.post('/multi', function* () {
            if (restricted && restricted.indexOf('post') !== -1) {
                this.status = 403;

                return;
            }
            const data = this.data || (yield coBody(this));
            this.body = yield q.batchInsert(data);
        }));
    }

    if (!excludedRouteMethod || excludedRouteMethod.indexOf('delete') === -1) {
        app.use(koaRoute.delete('/multi', function* () {
            if (restricted && restricted.indexOf('delete') !== -1) {
                this.status = 403;

                return;
            }
            const ids = this.query.id;
            this.body = yield q.batchDelete(ids);
        }));

        app.use(koaRoute.delete('/:id', function* (id) {
            if (restricted && restricted.indexOf('delete') !== -1) {
                this.status = 403;
                this.body = {};
                return;
            }
            try {
                this.body = yield q.removeOne(id);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                } else {
                    throw e;
                }
            }
        }));
    }

    if (!excludedRouteMethod || excludedRouteMethod.indexOf('put') === -1) {
        app.use(koaRoute.put('/:id', function* (id) {
            if (restricted && restricted.indexOf('put') !== -1) {
                this.status = 403;
                this.body = {};
                return;
            }
            const data = this.data || (yield coBody(this));
            let modifiedEntity;
            try {
                modifiedEntity = yield q.updateOne(id, data);
            } catch (e) {
                if (e.message === 'not found') {
                    this.status = 404;
                    return;
                }

                throw e;
            }
            this.body = modifiedEntity;
        }));
    }

    return app;
};
