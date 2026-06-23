const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productList = '.features_items .productinfo';
    this.ProductButton = '//a[@href="/products"]';
    this.viewProductdetail = '//a[@href="/product_details/1"]';
    this.addToCartButton = 'a.btn-default[data-product-id]';
    this.cartButton = 'a[href="/view_cart"]';
    this.searchInput = 'input[id="search_product"]';
    this.searchButton = 'button[id="submit_search"]';
    this.productCategory = 'a[href*="category"]';
    this.priceFilter = '.price-range';
  }

  async navigateToProducts() {
    await this.page.goto('/products');
  }

  async verifyProductsPageLoaded() {
    await expect(this.page.locator(this.productList).first()).toBeVisible();
  }

  async getProductCount() {
    return await this.page.locator(this.productList).count();
  }

  async viewFirstProduct() {
    await this.page.locator(this.ProductButton).click();
    await this.page.locator(this.viewProductdetail).click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchProduct(productName) {
    await this.page.fill(this.searchInput, productName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async addProductToCart(productIndex = 0) {
    const addButtons = this.page.locator(this.addToCartButton);
    if (productIndex < await addButtons.count()) {
      await addButtons.nth(productIndex).hover();
      await addButtons.nth(productIndex).click();
    }
  }

  async verifySearchResults(keyword) {
    const results = await this.page.locator(this.productList).count();
    expect(results).toBeGreaterThan(0);
  }

  async selectCategory(categoryName) {
    const categoryLink = this.page.locator(`//a[@href="${categoryName}"]`);
    await categoryLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = ProductsPage;
