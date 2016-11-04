import driver from '../../common/e2e/lib/chromeDriver';

after(async function tearDown() {
    await driver.quit();
});
