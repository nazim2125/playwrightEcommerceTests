const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
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
    this.cardNumberInput = 'input[data-qa="card-number"]';
    this.cardNameInput = 'input[data-qa="card-name"]';
    this.cardExpiryInput = 'input[data-qa="card-expiry"]';
    this.cardCvcInput = 'input[data-qa="card-cvc"]';
    this.payButton = 'button[id="submit"]';
    this.orderConfirmation = 'h2[data-qa="order-placed"]';
    this.addressHeading = 'h2:has-text("Address Details")';
    this.paymentHeading = 'h2:has-text("Payment")';
  }
  async verifyCheckoutPageLoaded() {
    try {
      await this.verifyElementVisible(this.addressHeading, 15000);
    } catch {
      await this.verifyElementVisible(this.firstNameInput, 15000);
    }
  }

  async fillAddress(addressData) {
    await this.verifyCheckoutPageLoaded();
    await this.fillElement(this.firstNameInput, addressData.firstName, 10000);
    await this.fillElement(this.lastNameInput, addressData.lastName, 10000);
    await this.fillElement(this.addressInput, addressData.address, 10000);
    await this.selectOption(this.countrySelect, addressData.country);
    await this.fillElement(this.stateInput, addressData.state, 10000);
    await this.fillElement(this.cityInput, addressData.city, 10000);
    await this.fillElement(this.zipcodeInput, addressData.zipcode, 10000);
    await this.fillElement(this.phoneInput, addressData.phone, 10000);
    
    console.log('Address filled');
  }

  async fillPaymentDetails(paymentData) {
    await this.verifyElementVisible(this.paymentHeading, 15000);
    await this.fillElement(this.cardNumberInput, paymentData.cardNumber, 10000);
    await this.fillElement(this.cardNameInput, paymentData.cardName, 10000);
    await this.fillElement(this.cardExpiryInput, paymentData.cardExpiry, 10000);
    await this.fillElement(this.cardCvcInput, paymentData.cardCvc, 10000);
    
    console.log('Payment details filled');
  }

  async addComment(comment) {
    await this.fillElement(this.commentTextarea, comment, 10000);
  }

  async placeOrder() {
    await this.verifyElementVisible(this.placeOrderButton, 15000);
    await this.clickElement(this.placeOrderButton, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Order placed');
  }

  async payNow() {
    await this.verifyElementVisible(this.payButton, 15000);
    await this.clickElement(this.payButton, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Payment submitted');
  }

  async verifyOrderConfirmation() {
    await this.verifyElementVisible(this.orderConfirmation, 15000);
    await expect(this.page.locator(this.orderConfirmation)).toContainText('Order Placed Successfully!');
  }

  async verifyOrderConfirmationVisible() {
    await this.verifyElementVisible(this.orderConfirmation, 15000);
  }
}

module.exports = CheckoutPage;