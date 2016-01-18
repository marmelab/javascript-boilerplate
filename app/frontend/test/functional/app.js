import {expect} from 'chai';
import webdriver from 'selenium-webdriver';
// import {startWebDriver, stopWebDriver} from '../../../test/webDriver';

describe('App', function() {
    this.timeout(10000);

    it('should print the application name', function(done) {
        const driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost:8081/frontend');

        driver.findElement(webdriver.By.className('title'))
            .then(element => element.getText())
            .then(text => {
                expect(text).to.equal('New App');
                done();
            });
    });
});
