const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test.beforeEach(async ({ page }) => {
  await page.route('**://*.googlesyndication.com/**', route => route.abort());
  await page.route('**://*.doubleclick.net/**', route => route.abort());
  await page.route('**://*.googleadservices.com/**', route => route.abort());
  await page.route('**://*.google-analytics.com/**', route => route.abort());
});

test.describe('@sanity Complete E2E Purchase Flow', () => {
  test('TC034: Complete End-to-End Purchase Flow - Existing User', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
 
    const loginPage = new LoginPage(page);
    await homePage.clickSignupLogin();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
  
    const productsPage = new ProductsPage(page);
    await homePage.clickAllProducts();
    await productsPage.verifyProductsPageLoaded();
 
    await productsPage.searchProduct(testData.products.search.validKeyword);
  
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
  
    const cartPage = new CartPage(page);
    await cartPage.verifyCartNotEmpty();

    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.addComment('Please handle with care');
    await checkoutPage.placeOrder();
    await expect(page.locator(checkoutPage.cardNumberInput).first()).toBeVisible();
  });

  test('TC035: Complete Purchase with Alternative Payment Card', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    const loginPage = new LoginPage(page);
    await homePage.clickSignupLogin();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    
    const productsPage = new ProductsPage(page);
    await homePage.clickAllProducts();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyAddressDetailsVisible();
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.paymentData.alternateCard);
  });

  test('TC036: Add Multiple Products to Cart and Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    const loginPage = new LoginPage(page);
    await homePage.clickSignupLogin();
    await loginPage.login(testData.users.validUser.email, testData.users.validUser.password);
    
    const productsPage = new ProductsPage(page);
    await homePage.clickAllProducts();
    
    await productsPage.addProductToCart(0);
    await productsPage.continueShoppingFromModal();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();
    
    const cartPage = new CartPage(page);
    await cartPage.verifyCartPageLoaded();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(2);
    
    await cartPage.proceedToCheckout();
    await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
  });

  test('TC037: Search for Product and Verify Not Found', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    const productsPage = new ProductsPage(page);
    await homePage.clickAllProducts();
    await productsPage.searchProduct(testData.products.search.invalidKeyword);
    
    const count = await productsPage.getProductCount();
    expect(count).toBe(0);
  });

  test('TC038: Filter Products by Category and Add to Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    const productsPage = new ProductsPage(page);
    await homePage.clickAllProducts();
    await productsPage.selectCategory('women');
    
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    
    const cartPage = new CartPage(page);
    await cartPage.verifyCartNotEmpty();
  });
});
