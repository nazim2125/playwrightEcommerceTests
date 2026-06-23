const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const testData = require('../fixtures/testData');
const { generateRandomEmail, isValidEmail } = require('../utils/testUtils');

test.describe('Authentication & Login Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.navigateToLoginPage();
  });

  test('TC-001: User login with valid credentials', async () => {
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });

  test('TC-002: User login with invalid email', async () => {
    await loginPage.login('invalidemail@example.com', testData.validUser.password);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-003: User login with invalid password', async () => {
    await loginPage.login(testData.validUser.email, 'wrongpassword');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-004: User login with empty credentials', async () => {
    await loginPage.login('', '');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  test('TC-005: User can navigate to signup from login page', async () => {
    expect(await loginPage.elementExists(loginPage.signupLink)).toBeTruthy();
  });

  test('TC-006: Verify login form elements are visible', async () => {
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

  test('TC-009: User logout and login again', async () => {
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
    
    await homePage.navigateToHome();
    await homePage.clickLogout();
    expect(await homePage.isUserLoggedIn()).toBeFalsy();
  });

  test('TC-010: Verify page title on login page', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Automation Exercise');
  });
});
