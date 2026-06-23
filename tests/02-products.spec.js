const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductsPage = require('../pages/ProductsPage');
const testData = require('../utils/testData');

test.describe('@smoke @regression Product Search and Browse Tests', () => {
  let homePage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    await homePage.navigate();
    await homePage.clickAllProducts();
  });

  test('TC006: Verify All Products Page Loads', async ({ page }) => {
    await productsPage.verifyProductsPageLoaded();
  });

  test('TC007: Verify Product Count on Page', async ({ page }) => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC008: User Can Search Products by Name', async ({ page }) => {
    await productsPage.searchProduct(testData.products.search.validKeyword);
    await productsPage.verifySearchResults(testData.products.search.validKeyword);
  });

  test('TC009: Search with Invalid Keyword Shows No Results', async ({ page }) => {
    await productsPage.searchProduct(testData.products.search.invalidKeyword);
    const count = await productsPage.getProductCount();
    expect(count).toBe(0);
  });

  test('TC010: User Can View Product Details', async ({ page }) => {
    await productsPage.viewFirstProduct();
    await expect(page.locator('.product-information')).toBeVisible();
    await expect(page.locator('button:has-text("Add to cart")')).toBeVisible();
  });

  test('TC011: Product List Contains Product Name and Price', async ({ page }) => {
    const productInfo = await page.locator('.productinfo').first();
    await expect(productInfo.locator('p')).not.toHaveCount(0);
  });

  test('TC012: User Can Filter Products by Category', async ({ page }) => {
    const initialCount = await productsPage.getProductCount();
    await productsPage.selectCategory('#Men');
    const filteredCount = await productsPage.getProductCount();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });
});
