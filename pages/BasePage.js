const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async waitForElement(selector, timeout = 10000) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      return true;
    } catch (error) {
      console.error(`Element not visible: ${selector}`);
      throw error;
    }
  }

  async clickElement(selector, timeout = 10000) {
    await this.waitForElement(selector, timeout);
    await this.page.locator(selector).click({ timeout });
  }

  async fillElement(selector, value, timeout = 10000) {
    await this.waitForElement(selector, timeout);
    await this.page.locator(selector).fill(value);
  }

  async waitForPageLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  async navigateTo(url) {
    await this.page.goto(url);
    await this.waitForPageLoad('networkidle');
  }

  async waitForText(text, timeout = 10000) {
    await this.page.getByText(text).first().waitFor({ state: 'visible', timeout });
  }

  async selectOption(selector, value) {
    await this.waitForElement(selector);
    await this.page.selectOption(selector, value);
    await this.waitForPageLoad('networkidle');
  }

  async verifyElementVisible(selector, timeout = 10000) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeVisible();
    return true;
  }

  async verifyElementInvisible(selector, timeout = 10000) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'hidden', timeout });
    await expect(locator).not.toBeVisible();
    return true;
  }

  async waitForElements(selector, count = 1, timeout = 10000) {
    const locators = this.page.locator(selector);
    await locators.first().waitFor({ state: 'visible', timeout });
    const actualCount = await locators.count();
    expect(actualCount).toBeGreaterThanOrEqual(count);
    return actualCount;
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }

  async waitWithRetry(asyncFn, maxRetries = 3, delayMs = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await asyncFn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.page.waitForTimeout(delayMs);
      }
    }
  }

  async clearAndFill(selector, value) {
    await this.waitForElement(selector);
    const locator = this.page.locator(selector);
    await locator.click();
    await locator.press('Control+A');
    await locator.press('Delete');
    await locator.type(value);
  }

  async waitForAPIResponse(urlPattern, timeout = 10000) {
    const response = await this.page.waitForResponse(
      response => response.url().includes(urlPattern),
      { timeout }
    );
    return response;
  }

  async safeNavigate(url) {
    try {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }),
        this.page.goto(url)
      ]);
    } catch (error) {
      console.warn('Navigation with network idle failed, trying domcontentloaded');
      await this.page.goto(url);
      await this.page.waitForLoadState('domcontentloaded');
    }
  }
}

module.exports = BasePage;