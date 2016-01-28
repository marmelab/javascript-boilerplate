module.exports = {
    'Demo test Marmelab': function(browser) {
        browser
            .url('http://www.google.com')
            .waitForElementVisible('body', 1000)
            .setValue('input[type=text]', 'marmelab')
            .waitForElementVisible('button[name=btnG]', 1000)
            .click('button[name=btnG]')
            .pause(1000)
            .assert.containsText('#main', 'marmelab - Atelier d\'innovation digitale')
            .end();
    },
};
