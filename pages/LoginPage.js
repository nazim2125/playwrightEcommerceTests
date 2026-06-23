const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.errorMessage = 'p[style*="color: red"]';
    this.loggedInAs = 'a:has-text("Logged in as")';
  }

  async navigateToLoginPage() {
    await this.gotoUntilVisible('/login', this.emailInput);
    await this.waitForVisible(this.passwordInput);
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);

    if (!email || !password) {
      return;
    }

    const result = await Promise.any([
      this.page.locator(this.loggedInAs).waitFor({ state: 'visible', timeout: this.defaultTimeout }).then(() => 'success'),
      this.page.locator(this.errorMessage).waitFor({ state: 'visible', timeout: this.defaultTimeout }).then(() => 'error')
    ]).catch(() => 'no-success');

    if (result === 'error') {
      return;
    }
  }

  async signup(name, email) {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
    await this.click(this.signupButton);

    await Promise.any([
      this.page.locator(this.errorMessage).waitFor({ state: 'visible', timeout: this.defaultTimeout }),
      this.page.waitForURL(/signup/, { timeout: this.defaultTimeout })
    ]);
  }

  async verifyLoginPageLoaded() {
    await this.waitForVisible(this.emailInput);
    await this.waitForVisible(this.passwordInput);
  }

  async verifyLoginSuccessful() {
    await this.waitForVisible(this.loggedInAs);
  }

  async isLoginSuccessful() {
    return await this.isVisible(this.loggedInAs);
  }

  async verifyErrorMessage() {
    const message = await this.getErrorMessage();
    if (!message) {
      throw new Error('Expected a login error message or browser validation message');
    }
    return message;
  }

  async getErrorMessage() {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }

    if (await this.elementExists(this.emailInput)) {
      const emailValidation = await this.page.locator(this.emailInput).evaluate(input => input.validationMessage);
      if (emailValidation) {
        return emailValidation;
      }
    }

    if (await this.elementExists(this.passwordInput)) {
      const passwordValidation = await this.page.locator(this.passwordInput).evaluate(input => input.validationMessage);
      if (passwordValidation) {
        return passwordValidation;
      }
    }

    return 'Login was not successful';
  }
}

module.exports = LoginPage;
