import http from 'http';
import path from 'path';

import api from '../../api';
import driver from '../../common/e2e/lib/chromeDriver';
import staticServer from '../../common/e2e/lib/staticServer';

before(async () => {
    this.apiServer = http.createServer(api.callback());
    await function startApi(cb) {
        this.apiServer.listen(3010, cb);
    };
    staticServer(
        path.join(__dirname, '../../../build/admin'),
        9081
    );
});

after(async () => {
    this.apiServer.close();
    await driver.quit();
});
