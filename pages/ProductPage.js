const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = 'input[id="search_product"]';
    this.searchButton = 'button[id="submit_search"]';
    this.categoryMenu = '.left-sidebar';
    this.categoryItem = 'a[href*="/category_products/"]';
    this.brandFilter = 'a[href*="/brand_products/"]';
    this.priceFilter = '[class="price-range"] input[type="range"]';
    this.productCard = '.productinfo';
    this.productName = '.productinfo p';
    this.productPrice = '.productinfo .price';
    this.addToCartButton = '.productinfo [class="btn btn-default add-to-cart"]';
    this.noProductsFound = 'p:has-text("No products are currently available in this category.")';
    this.sortDropdown = '#sortby';
    this.viewProductLink = 'a[href*="/product/"]';
    this.starRating = '.review-rating';
  }

  async navigateToProducts() {
    await this.goto('/products');
  }

  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  async getProductNames() {
    return await this.getAllTexts(this.productName);
  }

  async getProductCount() {
    return await this.page.locator(this.productCard).count();
  }

  async clickFirstProduct() {
    await this.click(`${this.viewProductLink}:first-of-type`);
    await this.waitForPageLoad();
  }

  async clickProductByName(productName) {
    await this.click(`//a[contains(text(), '${productName}')]`);
    await this.waitForPageLoad();
  }

  async addFirstProductToCart() {
  const card = this.page.locator(this.productCard).first();
  await card.scrollIntoViewIfNeeded();
  await card.hover();
  await this.click(`${this.addToCartButton}:first-of-type`);
  await this.waitForVisible('.modal.in, .modal.show');
}

  async addProductToCartByPosition(position) {
  const card = this.page.locator(this.productCard).nth(position - 1);
  await card.scrollIntoViewIfNeeded();
  await card.hover();

  const button = this.page.locator(this.addToCartButton).nth(position - 1);
  await button.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  await button.click({ timeout: this.defaultTimeout });
  await this.waitForVisible('.modal.in, .modal.show', this.defaultTimeout);
}

  async filterByCategory(categoryName) {
    await this.click(`//a[contains(text(), '${categoryName}')]`);
    await this.waitForPageLoad();
  }

  async filterByBrand(brandName) {
    await this.click(`//a[contains(text(), '${brandName}')]`);
    await this.waitForPageLoad();
  }

  async isNoProductsDisplayed() {
    return await this.isVisible(this.noProductsFound);
  }

  async sortProducts(sortOption) {
    await this.selectDropdown(this.sortDropdown, sortOption);
    await this.waitForPageLoad();
  }

  async areProductsVisible() {
    return await this.isVisible(this.productCard);
  }
}

module.exports = ProductPage;
