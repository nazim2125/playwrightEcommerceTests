const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
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
  await this.page.goto('https://www.automationexercise.com/login', {
    waitUntil: 'domcontentloaded'
  });
}

  async login(email, password) {
  await this.page.fill(this.emailInput, email);
  await this.page.fill(this.passwordInput, password);
  await this.page.click(this.loginButton);

  await Promise.race([
    this.page.locator(this.loggedInAs).waitFor({ state: 'visible' }),
    this.page.locator(this.errorMessage).waitFor({ state: 'visible' })
  ]);
}
  async signup(name, email) {
  await this.page.fill(this.signupNameInput, name);
  await this.page.fill(this.signupEmailInput, email);
  await this.page.click(this.signupButton);

  await Promise.race([
    this.page.locator(this.errorMessage).waitFor({ state: 'visible' }),
    this.page.waitForURL(/signup/)
  ]);
}

  async verifyLoginPageLoaded() {
    await expect(this.page.locator(this.emailInput)).toBeVisible();
    await expect(this.page.locator(this.passwordInput)).toBeVisible();
  }

  async verifyLoginSuccessful() {
    await expect(this.page.locator(this.loggedInAs)).toBeVisible();
  }

  async verifyErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }
}

module.exports = LoginPage;
