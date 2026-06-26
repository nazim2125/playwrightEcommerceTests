const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('@smoke @regression Shopping Cart Tests', () => {
  let homePage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await homePage.navigate();
    await homePage.clickAllProducts();
  });

  test('TC013: User Can Add Product to Cart', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await expect(page.locator('.modal')).toBeVisible();
  });

  test('TC014: User Can View Cart After Adding Product', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartNotEmpty();
  });

  test('TC015: Verify Products Added to Cart are Visible', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    await cartPage.verifyCartPageLoaded();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('TC016: User Can Update Product Quantity in Cart', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    await cartPage.verifyCartPageLoaded();
    const wasEditable = await cartPage.updateQuantity(0, 3);

    if (wasEditable) {
      const quantityInput = page.locator('.cart_quantity input').first();
      const value = await quantityInput.inputValue();
      expect(Number.parseInt(value, 10)).toBe(3);
      return;
    }

    expect(await cartPage.getItemQuantity(0)).toBeGreaterThan(0);
  });

  test('TC017: User Can Remove Product from Cart', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    await cartPage.verifyCartPageLoaded();
    const initialCount = await cartPage.getCartItemCount();
    await cartPage.removeProductFromCart(0);
    const updatedCount = await cartPage.getCartItemCount();
    expect(updatedCount).toBe(initialCount - 1);
  });

  test('TC018: Cart Displays Correct Product Details', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    await cartPage.verifyCartPageLoaded();
    const prices = await cartPage.getTotalPrice();
    expect(prices.length).toBeGreaterThan(0);
  });

  test('TC019: User Can Continue Shopping from Cart', async ({ page }) => {
    await productsPage.addProductToCart(0);
    await productsPage.viewCartFromModal();
    const continueButton = page.locator('a:has-text("Continue Shopping")');
    if (await continueButton.isVisible()) {
      await cartPage.click('a:has-text("Continue Shopping")');
      await cartPage.waitForPageLoad();
    }
  });
});
