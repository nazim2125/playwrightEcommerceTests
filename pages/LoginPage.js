const { expect } = require('@playwright/test');
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
    this.loginForm = 'div.login-form';
  }

  async login(email, password) {
    await this.verifyElementVisible(this.loginForm, 10000);
    await this.fillElement(this.emailInput, email, 10000);
    await this.fillElement(this.passwordInput, password, 10000);
    await this.page.click(this.loginButton);
    await this.waitForPageLoad('networkidle');
    try {
      await this.verifyElementVisible(this.loggedInAs, 10000);
    } catch (error) {
      console.error('Login failed - not logged in');
      throw error;
    }
  }

  async signup(name, email) {
    await this.verifyElementVisible(this.signupNameInput, 10000);
    await this.verifyElementVisible(this.signupEmailInput, 10000);
    await this.fillElement(this.signupNameInput, name, 10000);
    await this.fillElement(this.signupEmailInput, email, 10000);
    await this.page.click(this.signupButton);
    await this.waitForPageLoad('networkidle');
  }

  async verifyLoginPageLoaded() {
    await this.verifyElementVisible(this.loginForm, 10000);
    await this.verifyElementVisible(this.emailInput, 10000);
    await this.verifyElementVisible(this.passwordInput, 10000);
  }

  async verifyLoginSuccessful() {
    await this.verifyElementVisible(this.loggedInAs, 15000);
    await expect(this.page.locator(this.loggedInAs)).toBeVisible();
  }

  async verifyErrorMessage() {
    await this.verifyElementVisible(this.errorMessage, 10000);
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }

  async getErrorMessage() {
    await this.verifyElementVisible(this.errorMessage, 10000);
    return await this.page.locator(this.errorMessage).textContent();
  }

  async isLoggedIn() {
    try {
      await this.verifyElementVisible(this.loggedInAs, 5000);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = LoginPage;