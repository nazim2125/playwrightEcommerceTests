class BasePage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 15000;
    this.navigationTimeout = 30000;
  }

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

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: this.defaultTimeout });
  }

  async click(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click({ timeout: this.defaultTimeout });
  }

  async fill(selector, text) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(text, { timeout: this.defaultTimeout });
  }

  async getText(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    return await locator.textContent();
  }

  async isVisible(selector) {
    const locator = this.page.locator(selector);
    if (await locator.count() === 0) {
      return false;
    }

    return await locator.first().isVisible();
  }

  async waitForVisible(selector, timeout = 30000) {
    await this.page.locator(selector).first().waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(selector, timeout = 30000) {
    await this.page.locator(selector).first().waitFor({ state: 'hidden', timeout });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async reloadPage() {
    await this.page.reload({ waitUntil: 'domcontentloaded', timeout: this.defaultTimeout });
  }

  async goBack() {
    await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: this.defaultTimeout });
  }

  async elementExists(selector) {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  async hover(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.hover();
  }

  async getAllTexts(selector) {
    await this.waitForVisible(selector);
    return await this.page.locator(selector).allTextContents();
  }

  async selectDropdown(selector, value) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await locator.selectOption(value);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async waitForUrlContains(text) {
    await this.page.waitForURL(`**/*${text}*`, { timeout: this.defaultTimeout });
  }
}

module.exports = BasePage;
