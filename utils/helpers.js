const generateRandomEmail = () => {
  return `user${Date.now()}${Math.random().toString(36).substring(7)}@test.com`;
};

const generateRandomPhoneNumber = () => {
  return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
};

const generateRandomZipcode = () => {
  return Math.floor(Math.random() * 90000 + 10000).toString();
};

const waitForElement = async (page, selector, timeout = 5000) => {
  await page.locator(selector).first().waitFor({ state: 'visible', timeout });
};

const clearAndFill = async (page, selector, value) => {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  await locator.fill(value);
};

const takeScreenshot = async (page, name) => {
  await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
};

const verifyPageTitle = async (page, expectedTitle) => {
  const title = await page.title();
  return title.includes(expectedTitle);
};

const navigateAndWait = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('domcontentloaded');
};

module.exports = {
  generateRandomEmail,
  generateRandomPhoneNumber,
  generateRandomZipcode,
  waitForElement,
  clearAndFill,
  takeScreenshot,
  verifyPageTitle,
  navigateAndWait,
};
