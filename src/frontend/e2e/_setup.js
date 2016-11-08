import http from 'http';
import path from 'path';

import api from '../../api';
import driver from '../../common/e2e/lib/chromeDriver';
import staticServer from '../../common/e2e/lib/staticServer';

before(async () => {
    this.apiServer = http.createServer(api.callback());
    this.apiServer.listen(3010);
    staticServer(
        path.join(__dirname, '../../../build/frontend'),
        9080
    );
});

after(async () => {
    this.apiServer.close();
    await driver.quit();
});
