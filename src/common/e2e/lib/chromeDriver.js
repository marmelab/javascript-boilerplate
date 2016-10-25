import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const chromePath = `${__dirname}/../../../../${process.env.SELENIUM_BROWSER_BINARY_PATH}`;
const service = new chrome.ServiceBuilder(chromePath).build();

chrome.setDefaultService(service);

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

module.exports = driver;
