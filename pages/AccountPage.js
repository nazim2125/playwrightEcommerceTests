const BasePage = require('./BasePage');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountDetailsHeader = 'h2:has-text("Account Information")';
    this.usernameBadge = '.badge';
    this.downloadInvoiceLink = 'a:has-text("Download Invoice")';
    this.viewOrderLink = 'a:has-text("View Order")';
    this.addressBookLink = 'a:has-text("Address Book")';
    this.myOrdersLink = 'a:has-text("My Orders")';
    this.myWishlistLink = 'a:has-text("My Wishlist")';
    this.deleteAccountButton = 'a:has-text("Delete Account")';
    this.logoutLink = 'a:has-text("Logout")';
    this.loggedInAs = 'a:has-text("Logged in as")';
  }

  async navigateToAccount() {
    await this.goto('/');
    await this.verifyAccountPageLoaded();
  }

  async verifyAccountPageLoaded() {
    await this.waitForVisible(this.loggedInAs);
  }

  async verifyUserLoggedIn(username) {
    const badgeText = await this.getText(this.usernameBadge);
    if (!badgeText.includes(username)) {
      throw new Error(`Expected username badge to contain "${username}", received "${badgeText}"`);
    }
  }

  async viewMyOrders() {
    if (!await this.isOptionalVisible(this.myOrdersLink)) {
      return false;
    }

    await this.click(this.myOrdersLink);
    await this.waitForPageLoad();
    return true;
  }

  async viewAddressBook() {
    if (!await this.isOptionalVisible(this.addressBookLink)) {
      return false;
    }

    await this.click(this.addressBookLink);
    await this.waitForPageLoad();
    return true;
  }

  async viewWishlist() {
    if (!await this.isOptionalVisible(this.myWishlistLink)) {
      return false;
    }

    await this.click(this.myWishlistLink);
    await this.waitForPageLoad();
    return true;
  }

  async logout() {
    await this.click(this.logoutLink);
    await this.waitForPageLoad();
  }

  async deleteAccount() {
    await this.click(this.deleteAccountButton);
    await this.waitForPageLoad();
  }

  async isOptionalVisible(selector) {
    const locator = this.page.locator(selector);
    return await locator.count() > 0 && await locator.first().isVisible();
  }
}

module.exports = AccountPage;
