import { By } from 'selenium-webdriver';
import { after, describe, it } from 'selenium-webdriver/testing';
import driver from 'nodium/lib/driver';
import utils from 'nodium/lib/driver/utils';
import 'isomorphic-fetch';

const baseUrl = 'http://localhost:8083';

describe('Authentication', function () { // eslint-disable-line func-names
    this.timeout(15000);

    it('user should see sign-in form', () => {
        driver.get(`${baseUrl}`);
        utils(driver).waitForElementVisible(By.css('.sign-in'));
    });

    after(() => {
        driver.quit();
    });
});
