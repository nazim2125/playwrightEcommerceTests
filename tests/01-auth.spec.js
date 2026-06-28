const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const testData = require('../utils/testData');
const { generateRandomEmail, isValidEmail } = require('../utils/testUtils');

test.describe('Authentication & Login Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('TC-001: User login with valid credentials', async ({ page }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    await loginPage.verifyLoginSuccessful();
    expect(page.url()).toContain('/');
  });

  test('TC-002: User login with invalid email', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.invalidUser.email, testData.users.validUser.password);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-003: User login with invalid password', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.validUser.email, testData.users.invalidUser.password);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-004: User login with empty credentials', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('', '');
    const errorMsg = await loginPage.verifyErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-005: User can view signup form from login page', async ({ page }) => {
    await loginPage.navigateToLoginPage();
    await expect(page.locator(loginPage.signupNameInput)).toBeVisible();
    await expect(page.locator(loginPage.signupEmailInput)).toBeVisible();
  });

  test('TC-006: Verify login form elements are visible', async () => {
    await loginPage.navigateToLoginPage();
    expect(await loginPage.isVisible(loginPage.emailInput)).toBeTruthy();
    expect(await loginPage.isVisible(loginPage.passwordInput)).toBeTruthy();
    expect(await loginPage.isVisible(loginPage.loginButton)).toBeTruthy();
  });

  test('TC-007: Email validation - valid format', async () => {
    const email = 'test@example.com';
    expect(isValidEmail(email)).toBeTruthy();
  });

  test('TC-008: Email validation - invalid format', async () => {
    const email = 'invalidemail.com';
    expect(isValidEmail(email)).toBeFalsy();
  });

  test('TC-009: User logout and login again', async ({ page }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    await loginPage.verifyLoginSuccessful();
    expect(page.url()).toContain('/');
    
    await homePage.navigate();
    await homePage.clickLogout();
    expect(page.url()).toContain('/');
    
  });

  test('TC-010: Verify page title on login page', async ({ page }) => {
    await loginPage.navigateToLoginPage();
    const title = await page.title();
    expect(title).toContain('Automation Exercise');
  });
});
