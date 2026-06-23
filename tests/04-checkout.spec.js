const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test.describe('@regression Checkout and Payment Tests', () => {
  let homePage;
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
 
    await homePage.navigate();
    await homePage.clickSignupLogin();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    await homePage.clickAllProducts();
    await productsPage.addProductToCart(0);
    await page.click('a.btn.btn-default:has-text("View Cart")');
  });

  test('TC020: User Can Proceed to Checkout', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page.locator('h2, h1')).toContainText('Address');
  });

  test('TC021: User Can Fill Delivery Address', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.valid);
    const firstNameInput = page.locator(checkoutPage.firstNameInput);
    expect(await firstNameInput.inputValue()).toBe(testData.addressData.valid.firstName);
  });

  test('TC022: User Can Add Comments to Order', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.valid);
    await checkoutPage.addComment('Please deliver in the morning');
    const comment = page.locator(checkoutPage.commentTextarea);
    expect(await comment.inputValue()).toContain('morning');
  });

  test('TC023: User Can Select Payment Method', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.valid);
    await checkoutPage.placeOrder();
    await expect(page.locator('h2:has-text("Payment")')).toBeVisible();
  });

  test('TC024: User Can Enter Card Details', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.valid);
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.paymentData.creditCard);
    const cardNumber = page.locator(checkoutPage.cardNumberInput);
    expect(await cardNumber.inputValue()).toContain('4242');
  });

  test('TC025: Order Should Be Confirmed After Payment', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.valid);
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.paymentData.creditCard);
    await checkoutPage.payNow();
    await checkoutPage.verifyOrderConfirmationVisible();
  });

  test('TC026: User Can Use Different Delivery Address', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddress(testData.addressData.alternate);
    const cityInput = page.locator(checkoutPage.cityInput);
    expect(await cityInput.inputValue()).toBe(testData.addressData.alternate.city);
  });
});
