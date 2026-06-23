const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = 'input[data-qa="first-name"]';
    this.lastNameInput = 'input[data-qa="last-name"]';
    this.addressInput = 'input[data-qa="address"]';
    this.countrySelect = 'select[data-qa="country"]';
    this.stateInput = 'input[data-qa="state"]';
    this.cityInput = 'input[data-qa="city"]';
    this.zipcodeInput = 'input[data-qa="zipcode"]';
    this.phoneInput = 'input[data-qa="mobile-number"]';
    this.commentTextarea = 'textarea[data-qa="comment"]';
    this.placeOrderButton = 'a.btn.btn-default:has-text("Place Order")';
    this.paymentMethodSelect = 'select[name="payment_method"]';
    this.cardNumberInput = 'input[data-qa="card-number"]';
    this.cardNameInput = 'input[data-qa="card-name"]';
    this.cardExpiryInput = 'input[data-qa="card-expiry"]';
    this.cardCvcInput = 'input[data-qa="card-cvc"]';
    this.payButton = 'button[id="submit"]';
    this.orderConfirmation = 'h2[data-qa="order-placed"]';
  }

  async fillAddress(addressData) {
    await this.page.fill(this.firstNameInput, addressData.firstName);
    await this.page.fill(this.lastNameInput, addressData.lastName);
    await this.page.fill(this.addressInput, addressData.address);
    await this.page.selectOption(this.countrySelect, addressData.country);
    await this.page.fill(this.stateInput, addressData.state);
    await this.page.fill(this.cityInput, addressData.city);
    await this.page.fill(this.zipcodeInput, addressData.zipcode);
    await this.page.fill(this.phoneInput, addressData.phone);
  }

  async fillPaymentDetails(paymentData) {
    await this.page.fill(this.cardNumberInput, paymentData.cardNumber);
    await this.page.fill(this.cardNameInput, paymentData.cardName);
    await this.page.fill(this.cardExpiryInput, paymentData.cardExpiry);
    await this.page.fill(this.cardCvcInput, paymentData.cardCvc);
  }

  async addComment(comment) {
    await this.page.fill(this.commentTextarea, comment);
  }

  async placeOrder() {
    await this.page.click(this.placeOrderButton);
    await this.page.waitForLoadState('networkidle');
  }

  async payNow() {
    await this.page.click(this.payButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOrderConfirmation() {
    await expect(this.page.locator(this.orderConfirmation)).toContainText('Order Placed Successfully!');
  }

  async verifyOrderConfirmationVisible() {
    await expect(this.page.locator(this.orderConfirmation)).toBeVisible();
  }
}

module.exports = CheckoutPage;