const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginButton = 'a[href="/login"]';
    this.logoutButton = 'a[href="/logout"]';
    this.accountButton = 'a[href="/account"]';
    this.allProductsLink = 'a[href="/products"]';
    this.contactUsButton = 'a[href="/contact_us"]';
    this.testCasesLink = 'a[href="/test_cases"]';
    this.apiTestingLink = 'a[href="/api_list"]';
    this.homeHeading = 'h2.title:has-text("Category")';
    this.pageTitle = 'Automation Exercise';
  }

  async navigate() {
    await this.safeNavigate('/');
    await this.waitForPageLoad('networkidle');
    await this.verifyHomePageLoaded();
  }

  async clickSignupLogin() {
    await this.clickElement(this.signupLoginButton, 10000);
    await this.waitForPageLoad('domcontentloaded');
  }

  async clickLogout() {
    await this.clickElement(this.logoutButton, 10000);
    await this.waitForPageLoad('networkidle');
  }

  async clickAllProducts() {
    await this.clickElement(this.allProductsLink, 10000);
    await this.waitForPageLoad('networkidle');
  }

  async clickContactUs() {
    await this.clickElement(this.contactUsButton, 10000);
    await this.waitForPageLoad('domcontentloaded');
  }

  async verifyHomePageLoaded() {
    await this.waitForPageLoad('networkidle');
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await this.verifyElementVisible(this.homeHeading, 10000);
  }

  async verifySignupLoginButtonVisible() {
    await this.verifyElementVisible(this.signupLoginButton, 10000);
  }

  async verifyLogoutButtonVisible() {
    await this.verifyElementVisible(this.logoutButton, 10000);
  }

  async verifyPageTitle() {
    const title = await this.page.title();
    expect(title).toContain(this.pageTitle);
  }
}

module.exports = HomePage;