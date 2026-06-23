const { expect } = require('@playwright/test');
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
  }

  async navigateToAccount() {
    await this.safeNavigate('/account');
    await this.waitForPageLoad('networkidle');
  }

  async verifyAccountPageLoaded() {
    await this.verifyElementVisible(this.accountDetailsHeader, 15000);
    console.log('Account page loaded');
  }

  async verifyUserLoggedIn(username) {
    await this.verifyAccountPageLoaded();
    await expect(this.page.locator(this.usernameBadge)).toContainText(username);
  }

  async viewMyOrders() {
    await this.verifyAccountPageLoaded();
    await this.clickElement(this.myOrdersLink, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Viewing my orders');
  }

  async viewAddressBook() {
    await this.verifyAccountPageLoaded();
    await this.clickElement(this.addressBookLink, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Viewing address book');
  }

  async viewWishlist() {
    await this.verifyAccountPageLoaded();
    const wishlistLink = this.page.locator(this.myWishlistLink);
    const isVisible = await wishlistLink.isVisible().catch(() => false);
    
    if (isVisible) {
      await this.clickElement(this.myWishlistLink, 10000);
      await this.waitForPageLoad('networkidle');
      console.log('Viewing wishlist');
    } else {
      console.warn('Wishlist link not found');
    }
  }

  async logout() {
    await this.verifyAccountPageLoaded();
    await this.clickElement(this.logoutLink, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Logged out');
  }

  async deleteAccount() {
    await this.verifyAccountPageLoaded();
    await this.clickElement(this.deleteAccountButton, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Account deleted');
  }

  async isLoggedIn() {
    try {
      await this.verifyElementVisible(this.accountDetailsHeader, 5000);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = AccountPage;