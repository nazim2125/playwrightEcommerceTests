const BasePage = require('./BasePage');

/**
 * ProductPage - Page Object for product search, filtering, and viewing
 */
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

  /**
   * Navigate to products page
   */
  async navigateToProducts() {
    await this.goto('/products');
  }

  /**
   * Search for product by name
   */
  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Get list of all product names
   */
  async getProductNames() {
    return await this.getAllTexts(this.productName);
  }

  /**
   * Get product count
   */
  async getProductCount() {
    return await this.page.locator(this.productCard).count();
  }

  /**
   * Click on first product
   */
  async clickFirstProduct() {
    await this.click(`${this.viewProductLink}:first-of-type`);
    await this.waitForPageLoad();
  }

  /**
   * Click on product by name
   */
  async clickProductByName(productName) {
    await this.click(`//a[contains(text(), '${productName}')]`);
    await this.waitForPageLoad();
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart() {
    await this.click(`${this.addToCartButton}:first-of-type`);
    await this.waitForPageLoad();
  }

  /**
   * Add specific product to cart by position
   */
  async addProductToCartByPosition(position) {
    const buttons = await this.page.locator(this.addToCartButton);
    await buttons.nth(position - 1).click();
    await this.waitForPageLoad();
  }

  /**
   * Filter by category
   */
  async filterByCategory(categoryName) {
    await this.click(`//a[contains(text(), '${categoryName}')]`);
    await this.waitForPageLoad();
  }

  /**
   * Filter by brand
   */
  async filterByBrand(brandName) {
    await this.click(`//a[contains(text(), '${brandName}')]`);
    await this.waitForPageLoad();
  }

  /**
   * Check if no products message is displayed
   */
  async isNoProductsDisplayed() {
    return await this.isVisible(this.noProductsFound);
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption) {
    await this.selectDropdown(this.sortDropdown, sortOption);
    await this.waitForPageLoad();
  }

  /**
   * Check if products are visible
   */
  async areProductsVisible() {
    return await this.isVisible(this.productCard);
  }
}

module.exports = ProductPage;
