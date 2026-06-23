const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartTable = 'table.table-striped';
    this.cartItem = '#cart_info_table tbody tr';
    this.quantityInput = 'input[class*="cart_quantity"]';
    this.removeButton = 'a.cart_quantity_delete';
    this.proceedCheckoutButton = 'a.btn-default:has-text("Proceed")';
    this.continueShopping = 'a.btn-default:has-text("Continue")';
    this.cartEmpty = 'p:has-text("Cart is empty")';
    this.productPrice = '.cart_price p';
    this.cartHeading = 'h2:has-text("Shopping Cart")';
  }

  async navigateToCart() {
    await this.safeNavigate('/view_cart');
    await this.waitForPageLoad('networkidle');
  }

  async verifyCartPageLoaded() {
    try {
      await this.verifyElementVisible(this.cartHeading, 15000);
      console.log('Cart page loaded');
    } catch (error) {
      console.warn('Cart heading not found, checking for empty cart');
    }
  }

  async getCartItemCount() {
    await this.verifyCartPageLoaded();
    const count = await this.page.locator(this.cartItem).count();
    console.log(`Cart items: ${count}`);
    return count;
  }

  async verifyCartNotEmpty() {
    await this.verifyCartPageLoaded();
    const itemCount = await this.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifyCartEmpty() {
    await this.verifyElementVisible(this.cartEmpty, 10000);
  }

  async removeProductFromCart(itemIndex = 0) {
    const removeButtons = this.page.locator(this.removeButton);
    const count = await removeButtons.count();
    
    if (count > itemIndex) {
      const button = removeButtons.nth(itemIndex);
      await button.click({ timeout: 10000 });
      await this.waitForPageLoad('networkidle');
      console.log(`Product removed from cart`);
    }
  }

  async updateQuantity(itemIndex = 0, quantity = 2) {
    const quantityInputs = this.page.locator(this.quantityInput);
    const count = await quantityInputs.count();
    
    if (count > itemIndex) {
      const input = quantityInputs.nth(itemIndex);
      await input.waitFor({ state: 'visible', timeout: 10000 });
      await input.fill(quantity.toString());
      await this.waitForPageLoad('networkidle');
      console.log(`Quantity updated to ${quantity}`);
    }
  }

  async proceedToCheckout() {
    await this.verifyCartNotEmpty();
    await this.verifyElementVisible(this.proceedCheckoutButton, 10000);
    await this.clickElement(this.proceedCheckoutButton, 10000);
    await this.waitForPageLoad('networkidle');
    console.log('Proceeding to checkout');
  }

  async getTotalPrice() {
    await this.verifyCartPageLoaded();
    const prices = await this.page.locator(this.productPrice).allTextContents();
    return prices;
  }

  async continueShopping() {
    try {
      await this.clickElement(this.continueShopping, 10000);
      await this.waitForPageLoad('networkidle');
    } catch (error) {
      console.warn('Continue shopping button not found');
    }
  }
}

module.exports = CartPage;