/**
 * BasePage - Base class for all page objects
 * Contains common methods and utilities used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url = '/') {
  await this.page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
}
  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
  await this.page.waitForLoadState('domcontentloaded');
}

  /**
   * Click on an element
   */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Fill text input
   */
  async fill(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Get text from element
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(selector, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Reload page
   */
  async reloadPage() {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Check if element exists
   */
  async elementExists(selector) {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Hover over element
   */
  async hover(selector) {
    await this.page.locator(selector).hover();
  }

  /**
   * Get all text from multiple elements
   */
  async getAllTexts(selector) {
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Select option from dropdown by value
   */
  async selectDropdown(selector, value) {
    await this.page.locator(selector).selectOption(value);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for URL to contain text
   */
  async waitForUrlContains(text) {
    await this.page.waitForURL(`**/*${text}*`);
  }
}

module.exports = BasePage;
