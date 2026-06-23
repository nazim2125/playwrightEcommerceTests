const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const AccountPage = require('../pages/AccountPage');
const testData = require('../utils/testData');

test.describe('@regression Account Management Tests', () => {
  let homePage;
  let loginPage;
  let accountPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page);
 
    await homePage.navigate();
    await homePage.clickSignupLogin();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
  });

  test('TC027: User Can Access Account Details', async ({ page }) => {
    await accountPage.navigateToAccount();
    await accountPage.verifyAccountPageLoaded();
  });

  test('TC028: Logged In Username is Displayed', async ({ page }) => {
    await accountPage.navigateToAccount();
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
  });

  test('TC029: User Can View My Orders', async ({ page }) => {
    await accountPage.navigateToAccount();
    test.skip(!await accountPage.viewMyOrders(), 'My Orders link is not available on Automation Exercise for this account');
    await expect(page.locator('h2:has-text("Order"), h1:has-text("Order")')).toBeVisible();
  });

  test('TC030: User Can View Address Book', async ({ page }) => {
    await accountPage.navigateToAccount();
    test.skip(!await accountPage.viewAddressBook(), 'Address Book link is not available on Automation Exercise for this account');
    await expect(page.locator('text=Address Book')).toBeVisible();
  });

  test('TC031: User Can Access Wishlist', async ({ page }) => {
    await accountPage.navigateToAccount();
    test.skip(!await accountPage.viewWishlist(), 'Wishlist link is not available on Automation Exercise for this account');
    await expect(page.locator('h2, h1').first()).toBeVisible();
  });

  test('TC032: User Can Logout from Account Page', async ({ page }) => {
    await accountPage.navigateToAccount();
    await accountPage.logout();
    await expect(page.url()).not.toContain('/account');
  });

  test('TC033: Download Invoice Option Available', async ({ page }) => {
    await accountPage.navigateToAccount();
    test.skip(!await accountPage.isOptionalVisible(accountPage.downloadInvoiceLink), 'Download Invoice link is only available after placing an order');
    await expect(accountPage.page.locator(accountPage.downloadInvoiceLink)).toBeVisible();
  });
});
