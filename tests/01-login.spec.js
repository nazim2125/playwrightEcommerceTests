const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const testData = require('../utils/testData');

test.describe('@smoke @regression Login Tests', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigate();
  });

  test('TC001: Verify Home Page Loads', async ({ page }) => {
    await homePage.verifyHomePageLoaded();
    await homePage.verifySignupLoginButtonVisible();
  });

  test('TC002: User Should Be Able to Login with Valid Credentials', async ({ page }) => {
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    await loginPage.verifyLoginSuccessful();
    expect(page.url()).toContain('/');
  });

  test('TC003: User Should See Error with Invalid Credentials', async ({ page }) => {
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.login(testData.users.invalidUser.email, testData.users.invalidUser.password);
    await loginPage.verifyErrorMessage();
  });

  test('TC004: User Can Sign Up with Valid Email', async ({ page }) => {
    const newEmail = `test${Date.now()}@test.com`;
    await homePage.clickSignupLogin();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.signup('Test User', newEmail);
    await expect(page.locator('h2:has-text("Enter Account Information")')).toBeVisible();
  });

  test('TC005: Email Already Exists Error', async ({ page }) => {
    await homePage.clickSignupLogin();
    await loginPage.signup(testData.users.validUser.firstName, testData.users.validUser.email);
    await loginPage.verifyErrorMessage();
  });
});
