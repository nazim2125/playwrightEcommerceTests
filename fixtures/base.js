const base = require('@playwright/test');

const test = base.test.extend({
  page: async ({ page }, use) => {
    await page.route('**://*.googlesyndication.com/**', route => route.abort());
    await page.route('**://*.doubleclick.net/**', route => route.abort());
    await page.route('**://*.googleadservices.com/**', route => route.abort());
    await page.route('**://*.google-analytics.com/**', route => route.abort());
    await use(page);
  },
});

module.exports = { test, expect: base.expect };