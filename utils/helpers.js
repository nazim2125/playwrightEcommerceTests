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
  await page.waitForSelector(selector, { timeout });
};

const clearAndFill = async (page, selector, value) => {
  await page.click(selector);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await page.type(selector, value);
};

const takeScreenshot = async (page, name) => {
  await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
};

const verifyPageTitle = async (page, expectedTitle) => {
  const title = await page.title();
  return title.includes(expectedTitle);
};

const navigateAndWait = async (page, url) => {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
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
