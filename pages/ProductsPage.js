const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = '.features_items .productinfo';
    this.ProductButton = '//a[@href="/products"]';
    this.viewProductdetail = '//a[@href="/product_details/1"]';
    this.addToCartButton = 'a.btn-default[data-product-id]:visible';
    this.cartButton = 'a[href="/view_cart"]';
    this.viewCartButton = '.modal a:has-text("View Cart"), .modal a[href="/view_cart"]';
    this.continueShoppingButton = '.modal button:has-text("Continue Shopping"), .modal a:has-text("Continue")';
    this.searchInput = 'input[id="search_product"]';
    this.searchButton = 'button[id="submit_search"]';
    this.productCategory = 'a[href*="category"]';
    this.priceFilter = '.price-range';
  }

  async navigateToProducts() {
    await this.gotoUntilVisible('/products', this.productList);
  }

  async verifyProductsPageLoaded() {
    await this.waitForVisible(this.productList);
  }

  async getProductCount() {
    return await this.page.locator(this.productList).count();
  }

  async viewFirstProduct() {
    await this.click(this.ProductButton);
    await this.click(this.viewProductdetail);
    await this.waitForPageLoad();
  }

  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  async addProductToCart(productIndex = 0) {
    const addButtons = this.page.locator(this.addToCartButton);
    const count = await addButtons.count();
    if (count <= productIndex) {
      throw new Error(`Expected product at index ${productIndex}, but found ${count} add-to-cart buttons`);
    }

    if (productIndex < count) {
      const button = addButtons.nth(productIndex);
      await button.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await button.scrollIntoViewIfNeeded();
      await button.click({ force: true, timeout: this.defaultTimeout });
      await this.waitForVisible('.modal');
    }
  }

  async verifySearchResults(keyword) {
    const results = await this.page.locator(this.productList).count();
    if (results === 0) {
      throw new Error(`Expected search results for "${keyword}", but found none`);
    }
  }

  async selectCategory(categoryName) {
    const categoryLink = this.page.locator(`a[href="${categoryName}"], a[href*="${categoryName.replace(/^#/, '')}" i], a:has-text("${categoryName.replace(/^#/, '')}")`).first();
    await categoryLink.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await categoryLink.click();
    await this.waitForPageLoad();
  }

  async viewCartFromModal() {
    await this.click(this.viewCartButton);
    await this.waitForPageLoad();
  }

  async continueShoppingFromModal() {
    await this.click(this.continueShoppingButton);
    await this.waitForHidden('.modal');
  }
}

module.exports = ProductsPage;
