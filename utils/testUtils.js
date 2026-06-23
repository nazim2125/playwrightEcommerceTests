
function generateRandomEmail() {
  return `testuser.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`;
}

function generateRandomString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidCardNumber(cardNumber) {
  return cardNumber.length === 16 && /^\d+$/.test(cardNumber);
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getFormattedDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function extractNumbers(str) {
  return str.replace(/\D/g, '');
}

function extractPrice(priceString) {
  const match = priceString.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

module.exports = {
  generateRandomEmail,
  generateRandomString,
  isValidEmail,
  isValidCardNumber,
  getCurrentDate,
  getFormattedDate,
  extractNumbers,
  extractPrice
};
