/* eslint func-names: off */
import { until, By } from 'selenium-webdriver';
import expect from 'expect';
import driver from '../../common/e2e/lib/chromeDriver';

describe('Products', function () {
    this.timeout(15000);

    it('user should see the product list', function* () {
        driver.get('http://localhost:9080/#/products');
        yield driver.wait(until.elementLocated(By.css('.product-item')));
        const productItems = yield driver.findElements(By.css('.product-item'));
        expect(productItems.length).toEqual(3);
    });

    it('user should see the product details', function* () {
        driver.get('http://localhost:9080/#/products/1');
        yield driver.wait(until.elementLocated(By.css('.product-details')));

        expect(yield driver.findElement(By.css('.img-thumbnail')).getAttribute('src')).toEqual('http://lorempixel.com/400/400/');
        expect(yield driver.findElement(By.css('h2')).getText()).toEqual('abc');
        expect(yield driver.findElement(By.css('.description')).getText()).toEqual('John the zoo');
        expect(yield driver.findElement(By.css('.price')).getText()).toEqual('Price: $3.40');
    });

    after(() => {
        driver.quit();
    });
});
