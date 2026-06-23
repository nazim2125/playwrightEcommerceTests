/**
 * BasePage - Base class for all page objects
 * Contains common methods and utilities used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 15000;
    this.navigationTimeout = 30000;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url = '/') {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: this.navigationTimeout
    });
  }

  async gotoUntilVisible(url, selector, attempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        await this.goto(url);
        await this.waitForVisible(selector, this.navigationTimeout);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }
  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: this.defaultTimeout });
  }

  /**
   * Click on an element
   */
  async click(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click({ timeout: this.defaultTimeout });
  }

  /**
   * Fill text input
   */
  async fill(selector, text) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(text, { timeout: this.defaultTimeout });
  }

  /**
   * Get text from element
   */
  async getText(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    return await locator.textContent();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    const locator = this.page.locator(selector);
    if (await locator.count() === 0) {
      return false;
    }

    return await locator.first().isVisible();
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector, timeout = 30000) {
    await this.page.locator(selector).first().waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(selector, timeout = 30000) {
    await this.page.locator(selector).first().waitFor({ state: 'hidden', timeout });
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
    await this.page.reload({ waitUntil: 'domcontentloaded', timeout: this.defaultTimeout });
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: this.defaultTimeout });
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
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.hover();
  }

  /**
   * Get all text from multiple elements
   */
  async getAllTexts(selector) {
    await this.waitForVisible(selector);
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Select option from dropdown by value
   */
  async selectDropdown(selector, value) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.selectOption(value);
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
    await this.page.waitForURL(`**/*${text}*`, { timeout: this.defaultTimeout });
  }
}

module.exports = BasePage;
