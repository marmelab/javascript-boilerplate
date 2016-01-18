import webdriver from 'selenium-webdriver';

export function startWebDriver() {
    let driver;

    try {
        console.log("Initialize webdriver");

        driver = new webdriver
            .Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        console.log("Initialized webdriver");
    } catch (err) {
        console.log(err);
    }

    return driver;
}

export function stopWebDriver(driver, done) {
    console.log("Quit driver");

    driver.quit().then(() => {
        console.log("Quit driver");
        done();
    }, (err) => {
        console.log("Quit driver Error", err);
        done(err);
    });
}
