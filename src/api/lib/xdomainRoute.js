import config from 'config';
import { readFileSync } from 'fs';
import koaRoute from 'koa-route';

const xdomainScript = readFileSync(__dirname + '/../../../node_modules/xdomain/dist/xdomain.min.js');
const xdomainConfig = config.apps.api.security.xdomain;

export default koaRoute.get(xdomainConfig.slave.path, function* xdomainRoute() {
    this.body = `<!DOCTYPE HTML>
    <script>
    ${xdomainScript}
    xdomain.masters({
        '${xdomainConfig.master.base_url}': '*',
    });
    </script>
    `;
});
