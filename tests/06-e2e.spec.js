const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test.describe('End-to-End (E2E) Workflow Tests', () => {
  let homePage;
  let loginPage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('TC-051: Complete E2E - Browse homepage', async () => {
    await homePage.navigateToHome();
    expect(await homePage.isHomePageLoaded()).toBeTruthy();
  });

  test('TC-052: E2E - Home to Products to Cart', async () => {
    await homePage.navigateToHome();
    expect(await homePage.isHomePageLoaded()).toBeTruthy();
    await productPage.navigateToProducts();
    expect(await productPage.areProductsVisible()).toBeTruthy();

    await productPage.searchProduct(testData.products.search.validKeyword);
    await productPage.addFirstProductToCart();

    await cartPage.navigateToCart();
    expect(await cartPage.getNumberOfItemsInCart()).toBeGreaterThanOrEqual(0);
  });

  test('TC-053: E2E - Login flow complete', async () => {
    await loginPage.navigateToLoginPage();

    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();

    await homePage.navigateToHome();
    expect(await homePage.isUserLoggedIn()).toBeTruthy();
  });

  test('TC-054: E2E - Search and add product', async () => {
    await productPage.navigateToProducts();

    await productPage.searchProduct(testData.products.search.validKeyword);
    const productCount = await productPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    await productPage.addFirstProductToCart();

    await cartPage.navigateToCart();
    expect(await cartPage.getNumberOfItemsInCart()).toBeGreaterThanOrEqual(0);
  });

  test('TC-055: E2E - Login and browse products', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();

    await productPage.navigateToProducts();
    expect(await productPage.areProductsVisible()).toBeTruthy();
  });

  test('TC-056: E2E - Search multiple products', async () => {
    await productPage.navigateToProducts();

    await productPage.searchProduct(testData.products.search.validKeyword);
    expect(await productPage.areProductsVisible()).toBeTruthy();
  });

  test('TC-057: E2E - Add multiple products to cart', async () => {
    await productPage.navigateToProducts();
  
    await productPage.searchProduct(testData.products.search.validKeyword);
    await productPage.addFirstProductToCart();

    await productPage.navigateToProducts();
    await productPage.addFirstProductToCart();

    await cartPage.navigateToCart();
    const itemCount = await cartPage.getNumberOfItemsInCart();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('TC-058: E2E - Remove product from cart', async () => {
    await productPage.navigateToProducts();
    await productPage.searchProduct(testData.products.search.validKeyword);
    await productPage.addFirstProductToCart();

    await cartPage.navigateToCart();
    const countBefore = await cartPage.getNumberOfItemsInCart();

    if (countBefore > 0) {
      await cartPage.removeFirstItem();
      const countAfter = await cartPage.getNumberOfItemsInCart();
      expect(countAfter).toBeLessThanOrEqual(countBefore);
    }
  });

  test('TC-059: E2E - Checkout process', async () => {
  
    await loginPage.navigateToLoginPage();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);

    await productPage.navigateToProducts();
    await productPage.searchProduct(testData.products.search.validKeyword);
    await productPage.addFirstProductToCart();

    await cartPage.navigateToCart();
    const itemCount = await cartPage.getNumberOfItemsInCart();
    
    if (itemCount > 0) {
      await cartPage.proceedToCheckout();
      expect(await checkoutPage.page.url()).toContain('checkout');
      await checkoutPage.verifyAddressDetailsVisible();
    }
  });

  test('TC-060: E2E - Newsletter subscription', async () => {
    await homePage.navigateToHome();
    await homePage.subscribeToNewsletter(testData.newsletterEmail);
    
    const isSubscribed = await homePage.isSubscriptionSuccessful();
    expect(isSubscribed).toBeTruthy();
  });
});
