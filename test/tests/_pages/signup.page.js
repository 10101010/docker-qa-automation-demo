let basePage = require('./base.page.js');

class SignUpPage extends basePage {

    get emailField(){ return element(by.id('email')); }
    get nameField(){ return element(by.id('name')); }
    get usernameField(){ return element(by.id('username')); }
    get passwordField(){ return element(by.id('password')); }

    get signInButton() { return element(by.css('.btn.btn-primary')); }

    open() {
        browser.driver.get(`${browser.baseUrl}/signup`);
    }

    registerAs(model) {
        this.waitForVisibility(this.emailField);
        this.emailField.sendKeys(model.email);
        this.nameField.sendKeys(model.fullName);
        this.usernameField.sendKeys(model.username);
        this.passwordField.sendKeys(model.password);
    }

}

module.exports = new SignUpPage();