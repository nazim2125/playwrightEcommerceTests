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
    this.commentTextarea = 'textarea[data-qa="comment"], textarea[name="message"]';
    this.addressDetails = '#address_delivery, .address_delivery, ul[id="address_delivery"]';
    this.invoiceAddress = '#address_invoice, .address_invoice, ul[id="address_invoice"]';
    this.placeOrderButton = 'a.btn.btn-default:has-text("Place Order")';
    this.paymentMethodSelect = 'select[name="payment_method"]';
    this.cardNumberInput = 'input[data-qa="card-number"], input[name="card_number"]';
    this.cardNameInput = 'input[data-qa="name-on-card"], input[data-qa="card-name"], input[name="name_on_card"]';
    this.cardExpiryInput = 'input[data-qa="card-expiry"]';
    this.cardExpiryMonthInput = 'input[data-qa="expiry-month"], input[name="expiry_month"]';
    this.cardExpiryYearInput = 'input[data-qa="expiry-year"], input[name="expiry_year"]';
    this.cardCvcInput = 'input[data-qa="cvc"], input[data-qa="card-cvc"], input[name="cvc"]';
    this.payButton = 'button[data-qa="pay-button"], button[id="submit"]';
    this.orderConfirmation = 'h2[data-qa="order-placed"]';
  }

  async fillAddress(addressData) {
    if (!await this.elementExists(this.firstNameInput)) {
      await this.verifyAddressDetailsVisible();
      return false;
    }

    await this.fill(this.firstNameInput, addressData.firstName);
    await this.fill(this.lastNameInput, addressData.lastName);
    await this.fill(this.addressInput, addressData.address);
    await this.selectCountry(addressData.country);
    await this.fill(this.stateInput, addressData.state);
    await this.fill(this.cityInput, addressData.city);
    await this.fill(this.zipcodeInput, addressData.zipcode);
    await this.fill(this.phoneInput, addressData.phone || addressData.mobile);
    return true;
  }

  async fillPaymentDetails(paymentData) {
    await this.fill(this.cardNumberInput, paymentData.cardNumber);
    await this.fill(this.cardNameInput, paymentData.cardName || paymentData.nameOnCard);
    await this.fill(this.cardCvcInput, paymentData.cardCvc || paymentData.cvc);

    if (await this.elementExists(this.cardExpiryInput)) {
      await this.fill(this.cardExpiryInput, paymentData.cardExpiry);
      return;
    }

    const expiry = paymentData.cardExpiry || `${paymentData.expiryMonth}/${paymentData.expiryYear}`;
    const [month, year] = expiry.split('/');
    await this.fill(this.cardExpiryMonthInput, month);
    await this.fill(this.cardExpiryYearInput, year.length === 2 ? `20${year}` : year);
  }

  async addComment(comment) {
    await this.fill(this.commentTextarea, comment);
  }

  async placeOrder() {
    await this.click(this.placeOrderButton);
    await this.waitForVisible(this.cardNumberInput);
  }

  async payNow() {
    await this.click(this.payButton);
    await this.waitForPageLoad();
  }

  async verifyOrderConfirmation() {
    const confirmationText = await this.getText(this.orderConfirmation);
    if (!confirmationText.includes('Order Placed Successfully!')) {
      throw new Error(`Expected order confirmation text, received "${confirmationText}"`);
    }
  }

  async verifyOrderConfirmationVisible() {
    await this.waitForVisible(this.orderConfirmation);
  }

  async selectCountry(country) {
    const countryDropdown = this.page.locator(this.countrySelect).first();
    await countryDropdown.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await countryDropdown.selectOption(country);
    } catch {
      await countryDropdown.selectOption({ label: country });
    }
  }

  async verifyAddressDetailsVisible() {
    await this.waitForVisible(this.addressDetails);
  }

  async getDeliveryAddressText() {
    await this.verifyAddressDetailsVisible();
    return await this.page.locator(this.addressDetails).first().innerText();
  }
}

module.exports = CheckoutPage;
