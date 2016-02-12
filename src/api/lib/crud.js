import koa from 'koa';
import coBody from 'co-body';
import koaRoute from 'koa-route';

export default (queriesFactory, availableMethods = ['GET', 'POST', 'PUT', 'DELETE']) => {
    const app = koa();
    let queries;

    app.use(function* (next) {
        const clean = method => method.toLowerCase().trim();
        const method = clean(this.method);
        const isAllowed = availableMethods.map(clean).indexOf(method) !== -1;

        if (!isAllowed) {
            this.status = 405; // Method Not Allowed
            this.body = {};
            return;
        }

        yield next;
    });

    app.use(function* (next) {
        queries = queriesFactory(this.client);
        yield next;
    });

    // GET /
    app.use(koaRoute.get('/', function* () {
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
    }));

    // GET /:id
    app.use(koaRoute.get('/:id', function* (id) {
        try {
            this.body = yield queries.selectOneById(id);
        } catch (e) {
            if (e.message === 'not found') {
                this.status = 404;
            } else {
                throw e;
            }
        }
    }));

    // POST /
    app.use(koaRoute.post('/', function* () {
        const data = this.data || (yield coBody(this));
        this.body = yield queries.insertOne(data);
    }));

    // POST /multi
    app.use(koaRoute.post('/multi', function* () {
        const data = this.data || (yield coBody(this));
        this.body = yield queries.batchInsert(data);
    }));

    // DELETE /
    app.use(koaRoute.delete('/:id', function* (id) {
        try {
            this.body = yield queries.removeOne(id);
        } catch (e) {
            if (e.message === 'not found') {
                this.status = 404;
            } else {
                throw e;
            }
        }
    }));

    // DELETE /multi
    app.use(koaRoute.delete('/multi', function* () {
        const ids = this.query.id;
        this.body = yield queries.batchDelete(ids);
    }));

    // PUT /:id
    app.use(koaRoute.put('/:id', function* (id) {
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
    }));

    return app;
};
