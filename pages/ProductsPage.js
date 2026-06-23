const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = '.features_items .productinfo';
    this.viewProductButton = 'a[href*="/product/"]';
    this.addToCartButton = 'a.btn-default[data-product-id]';
    this.cartButton = 'a[href="/view_cart"]';
    this.searchInput = 'input[id="search_product"]';
    this.searchButton = 'button[id="submit_search"]';
    this.productTitle = 'h2.title:has-text("All Products")';
  }

  async navigateToProducts() {
    await this.safeNavigate('/products');
    await this.waitForPageLoad('networkidle');
    await this.verifyProductsPageLoaded();
  }

  async verifyProductsPageLoaded() {
    await this.verifyElementVisible(this.productTitle, 15000);
    await this.waitForElements(this.productList, 1, 15000);
  }

  async getProductCount() {
    await this.verifyProductsPageLoaded();
    const count = await this.page.locator(this.productList).count();
    console.log(`Found ${count} products`);
    return count;
  }

  async viewFirstProduct() {
    await this.verifyProductsPageLoaded();
    await this.waitForElement(this.viewProductButton, 15000);
    const firstProduct = this.page.locator(this.viewProductButton).first();
    await firstProduct.click({ timeout: 10000 });
    await this.waitForPageLoad('networkidle');
  }

  async searchProduct(productName) {
    await this.verifyElementVisible(this.searchInput, 10000);
    await this.fillElement(this.searchInput, productName, 10000);
    await this.clickElement(this.searchButton, 10000);
    await this.waitForPageLoad('networkidle');
  }

  async addProductToCart(productIndex = 0) {
    await this.verifyProductsPageLoaded();
    
    const addButtons = this.page.locator(this.addToCartButton);
    const count = await addButtons.count();
    
    expect(count).toBeGreaterThan(productIndex);
    
    const button = addButtons.nth(productIndex);

    await button.hover({ timeout: 10000 });
    await button.click({ timeout: 10000 });
    await this.page.waitForTimeout(1000); 
  }

  async verifySearchResults(keyword) {
    await this.waitForPageLoad('networkidle');
    const results = await this.page.locator(this.productList).count();
    console.log(`🔍 Search for "${keyword}": ${results} results`);
    return results;
  }

  async selectCategory(categoryName) {
    const categoryLink = `a[href*="${categoryName}"]`;
    await this.clickElement(categoryLink, 10000);
    await this.waitForPageLoad('networkidle');
  }
}

module.exports = ProductsPage;