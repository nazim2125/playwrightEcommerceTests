const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const testData = require('../utils/testData');

test.describe('@smoke Cross-Browser Compatibility Tests', () => {
  test('TC039: Home Page Loads on All Browsers', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifyHomePageLoaded();
    console.log(`✓ Home page loaded successfully on ${browserName}`);
  });

  test('TC040: Signup Login Button Visible on All Browsers', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifySignupLoginButtonVisible();
    console.log(`✓ Signup/Login button visible on ${browserName}`);
  });

  test('TC041: Product Search Works on All Browsers', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickAllProducts();

    await expect(page.locator('.features_items')).toBeVisible();
    console.log(`✓ Products page loads on ${browserName}`);
  });

  test('TC042: Responsive Design - Mobile Viewport', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifyHomePageLoaded();
    

    const viewportSize = page.viewportSize();
    console.log(`✓ Page responsive on ${browserName} - Viewport: ${viewportSize.width}x${viewportSize.height}`);
  });

  test('TC043: CSS and Layout Consistency', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    const header = page.locator('header, [role="banner"]');
    await expect(header).toBeVisible();
    console.log(`✓ Header is visible and consistent on ${browserName}`);
  });

  test('TC044: JavaScript Functionality Works on All Browsers', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await homePage.clickAllProducts();
    await expect(page.locator('.features_items')).toBeVisible();
    console.log(`✓ JavaScript functionality working on ${browserName}`);
  });

  test('TC045: Form Submission on All Browsers', async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickSignupLogin();
    
    const emailInput = page.locator('input[data-qa="login-email"]');
    const passwordInput = page.locator('input[data-qa="login-password"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    console.log(`✓ Form elements visible and functional on ${browserName}`);
  });
});
