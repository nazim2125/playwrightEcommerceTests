
const testData = {
  validUser: {
    email: 'automation.test.user@example.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test Street',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Noida',
    zipcode: '201301',
    mobile: '9876543210'
  },

  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword123!'
  },

  newUser: {
    email: `newuser.${Date.now()}@example.com`,
    password: 'NewPassword123!',
    firstName: 'New',
    lastName: 'User'
  },

  paymentDetails: {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2025'
  },

  searchTerms: {
    validProduct: 'dress',
    invalidProduct: 'nonexistentproduct123',
    partialProduct: 'T'
  },

  categories: {
    menCategory: 'Men',
    womenCategory: 'Women',
    kidsCategory: 'Kids'
  },

  newsletterEmail: `newsletter.${Date.now()}@example.com`,

  urls: {
    baseUrl: 'https://practice.automationexercise.com',
    homeUrl: '/',
    loginUrl: '/login',
    productsUrl: '/products',
    cartUrl: '/view_cart',
    checkoutUrl: '/payment',
    accountUrl: '/account'
  }
};

module.exports = testData;
