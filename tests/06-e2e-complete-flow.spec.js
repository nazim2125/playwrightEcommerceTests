const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

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
    await page.click('a.btn.btn-default:has-text("View Cart")');
  
    const cartPage = new CartPage(page);
    await cartPage.verifyCartNotEmpty();

    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillAddress(testData.addressData.valid);
    await checkoutPage.addComment('Please handle with care');
    await checkoutPage.placeOrder();
    await expect(page.locator('h2, h1')).toContainText(/Payment|Review/);
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
    await page.click('a.btn.btn-default:has-text("View Cart")');
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillAddress(testData.addressData.alternate);
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
    
    // Add 2 products
    await productsPage.addProductToCart(0);
    await page.click('a.btn.btn-default:has-text("Continue")');
    await productsPage.addProductToCart(1);
    await page.click('a.btn.btn-default:has-text("View Cart")');
    
    const cartPage = new CartPage(page);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(2);
    
    await cartPage.proceedToCheckout();
    await expect(page.locator('h2, h1')).toContainText('Address');
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
    await page.click('a.btn.btn-default:has-text("View Cart")');
    
    const cartPage = new CartPage(page);
    await cartPage.verifyCartNotEmpty();
  });
});
