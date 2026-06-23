const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.signupLoginButton = 'a[href="/login"]';
    this.logoutButton = 'a[href="/logout"]';
    this.accountButton = 'a[href="/account"]';
    this.allProductsLink = 'a[href="/products"]';
    this.contactUsButton = 'a[href="/contact_us"]';
    this.testCasesLink = 'a[href="/test_cases"]';
    this.apiTestingLink = 'a[href="/api_list"]';
  }

  async navigate() {
    await this.page.goto('/');
  }

  async clickSignupLogin() {
    await this.page.click(this.signupLoginButton);
  }

  async clickLogout() {
    await this.page.click(this.logoutButton);
  }

  async clickAllProducts() {
    await this.page.click(this.allProductsLink);
  }

  async clickContactUs() {
    await this.page.click(this.contactUsButton);
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async verifySignupLoginButtonVisible() {
    await expect(this.page.locator(this.signupLoginButton)).toBeVisible();
  }
}

module.exports = HomePage;
