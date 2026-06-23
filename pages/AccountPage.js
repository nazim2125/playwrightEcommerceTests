const { expect } = require('@playwright/test');

class AccountPage {
  constructor(page) {
    this.page = page;
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
    await this.page.goto('/account');
  }

  async verifyAccountPageLoaded() {
    await expect(this.page.locator(this.accountDetailsHeader)).toBeVisible();
  }

  async verifyUserLoggedIn(username) {
    await expect(this.page.locator(this.usernameBadge)).toContainText(username);
  }

  async viewMyOrders() {
    await this.page.click(this.myOrdersLink);
    await this.page.waitForLoadState('networkidle');
  }

  async viewAddressBook() {
    await this.page.click(this.addressBookLink);
    await this.page.waitForLoadState('networkidle');
  }

  async viewWishlist() {
    await this.page.click(this.myWishlistLink);
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    await this.page.click(this.logoutLink);
    await this.page.waitForLoadState('networkidle');
  }

  async deleteAccount() {
    await this.page.click(this.deleteAccountButton);
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = AccountPage;
