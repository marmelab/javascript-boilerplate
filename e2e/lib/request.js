import http from 'http';
import request from 'request';
import app from '../../src/api/server';

export default function myRequest(params, authToken = null) {
    return (callback) => {
        const port = process.env.NODE_PORT || 3010;
        const server = http.createServer(app.callback()).listen(port);
        const baseRequest = request.defaults({
            baseUrl: `http://localhost:${port}`,
            gzip: true,
            json: true,
            headers: authToken ? { authorization: `${authToken}` } : {},
        });

        baseRequest(params, (error, response) => {
            server.close();

            callback(error, response);
        });
    };
}
