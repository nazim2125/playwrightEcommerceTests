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
    this.loggedInAs = 'a:has-text("Logged in as")';
    this.subscriptionEmail = '#susbscribe_email';
    this.subscriptionButton = '#subscribe';
    this.subscriptionSuccess = '.alert-success:has-text("You have been successfully subscribed!")';
  }

  async navigate() {
    await this.gotoUntilVisible('/', 'header');
  }

  async navigateToHome() {
    await this.navigate();
  }

  async clickSignupLogin() {
    await this.gotoUntilVisible('/login', 'input[data-qa="login-email"]');
  }

  async clickLogout() {
    if (!await this.isVisible(this.logoutButton)) {
      return;
    }

    await this.click(this.logoutButton);
    await this.waitForPageLoad();
  }

  async clickAllProducts() {
    await this.gotoUntilVisible('/products', '.features_items .productinfo');
  }

  async clickContactUs() {
    await this.goto('/contact_us');
  }

  async verifyHomePageLoaded() {
    const title = await this.page.title();
    if (!/Automation Exercise/.test(title)) {
      throw new Error(`Expected Automation Exercise title, received "${title}"`);
    }
  }

  async verifySignupLoginButtonVisible() {
    await this.waitForVisible(this.signupLoginButton);
  }

  async isHomePageLoaded() {
    await this.verifyHomePageLoaded();
    return true;
  }

  async isUserLoggedIn() {
    return await this.isVisible(this.loggedInAs);
  }

  async subscribeToNewsletter(email) {
    await this.fill(this.subscriptionEmail, email);
    await this.click(this.subscriptionButton);
  }

  async isSubscriptionSuccessful() {
    await this.waitForVisible(this.subscriptionSuccess);
    return true;
  }
}

module.exports = HomePage;
