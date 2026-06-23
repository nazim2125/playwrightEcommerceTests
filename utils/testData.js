const testData = {
  users: {
    validUser: {
      email: 'nazim57262@gmail.com',
      password: 'password@123',
      firstName: 'Test',
      lastName: 'User',
    },
    newUser: {
      email: `testuser${Date.now()}@automation.com`,
      password: 'NewTest@123',
      firstName: 'NewTest',
      lastName: 'User',
    },
    invalidUser: {
      email: 'invalid@test.com',
      password: 'wrongpassword',
    },
  },
  addressData: {
    valid: {
      firstName: 'Nazim',
      lastName: 'Khan',
      address: '123 Main Street',
      country: 'india',
      state: 'Uttar pradesh',
      city: 'Noida',
      zipcode: '90001',
      phone: '1234567890',
    },
    alternate: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Oak Avenue',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5H 2N2',
      phone: '4165551234',
    },
  },
  paymentData: {
    creditCard: {
      cardNumber: '4242424242424242',
      cardName: 'John Doe',
      cardExpiry: '12/27',
      cardCvc: '123',
    },
    alternateCard: {
      cardNumber: '5555555555554444',
      cardName: 'Jane Smith',
      cardExpiry: '06/27',
      cardCvc: '456',
    },
  },
  products: {
    search: {
      validKeyword: 'Blue Top',
      invalidKeyword: 'xyz123nonexistent',
    },
    categories: ['dress', 'men', 'women'],
  },
};

module.exports = testData;
