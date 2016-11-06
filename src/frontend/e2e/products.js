/* eslint func-names: off */
import { until, By } from 'selenium-webdriver';
import expect from 'expect';
import driver from '../../common/e2e/lib/chromeDriver';

describe('Products', function () {
    this.timeout(15000);

    it('user should see the product list', async () => {
        driver.get('http://localhost:9080/#/products');
        await driver.wait(until.elementLocated(By.css('.product-item')));

        const productItems = await driver.findElements(By.css('.product-item'));
        expect(productItems.length).toEqual(3);
    });

    it('user should see the product details', async () => {
        driver.get('http://localhost:9080/#/products/ad7cd2b8-9bf7-42ce-bad7-3f2ca39e072d');
        await driver.wait(until.elementLocated(By.css('.product-details')));

        expect(await driver.findElement(By.css('.img-thumbnail')).getAttribute('src')).toEqual('http://lorempixel.com/400/400/');
        expect(await driver.findElement(By.css('h2')).getText()).toEqual('abc');
        expect(await driver.findElement(By.css('.description')).getText()).toEqual('John the zoo');
        expect(await driver.findElement(By.css('.price')).getText()).toEqual('Price: $3.40');
    });
});
