import driver from '../../common/e2e/lib/chromeDriver';

after(async () => {
    await driver.quit();
});
