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
    await productsPage.viewCartFromModal();
  });

  test('TC020: User Can Proceed to Checkout', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
  });

  test('TC021: User Can View Delivery Address', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressDetailsVisible();
    await expect(page.locator(checkoutPage.addressDetails).first()).toBeVisible();
  });

  test('TC022: User Can Add Comments to Order', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.addComment('Please deliver in the morning');
    const comment = page.locator(checkoutPage.commentTextarea).first();
    expect(await comment.inputValue()).toContain('morning');
  });

  test('TC023: User Can Select Payment Method', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.placeOrder();
    await expect(page.locator(checkoutPage.cardNumberInput).first()).toBeVisible();
  });

  test('TC024: User Can Enter Card Details', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.paymentData.creditCard);
    const cardNumber = page.locator(checkoutPage.cardNumberInput).first();
    expect(await cardNumber.inputValue()).toContain('4242');
  });

  test('TC025: Payment Form Should Be Ready for Submission', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.paymentData.creditCard);
    await expect(page.locator(checkoutPage.payButton).first()).toBeVisible();
  });

  test('TC026: Delivery Address Is Displayed During Checkout', async ({ page }) => {
    await cartPage.proceedToCheckout();
    const addressText = await checkoutPage.getDeliveryAddressText();
    expect(addressText.length).toBeGreaterThan(0);
  });
});
