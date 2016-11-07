const serve = require('koa-static');
const Koa = require('koa');

module.exports = function staticServer(path, port) {
    const app = new Koa();
    app.use(serve(path));
    app.listen(port);

    return app;
};
