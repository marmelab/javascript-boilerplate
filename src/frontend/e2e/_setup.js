import driver from '../../common/e2e/lib/chromeDriver';

after(function* tearDown() {
    yield driver.quit();
});
