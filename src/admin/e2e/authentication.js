/* eslint func-names: off */
import { until, By } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../common/e2e/lib/chromeDriver';

const baseUrl = 'http://localhost:9081';

describe('Authentication', function () { // eslint-disable-line func-names
    this.timeout(15000);

    it('user should see sign-in form', async () => {
        driver.get(`${baseUrl}`);
        await driver.wait(until.elementLocated(By.css('.sign-in')));
    });
});
