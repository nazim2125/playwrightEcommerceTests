const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = 'table.table-striped';
    this.cartItem = '#cart_info_table tbody tr';
    this.quantityInput = 'input[class*="cart_quantity"]';
    this.removeButton = 'a.cart_quantity_delete';
    this.proceedCheckoutButton = 'a.btn-default:has-text("Proceed")';
    this.continueShopping = 'a.btn-default:has-text("Continue")';
    this.cartEmpty = 'p:has-text("Cart is empty")';
    this.productPrice = '.cart_price p';
    this.productQuantity = '.cart_quantity button';
  }

  async navigateToCart() {
    await this.page.goto('/view_cart');
  }

  async verifyCartPageLoaded() {
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartItem).count();
  }

  async verifyCartNotEmpty() {
    const cartItems = await this.page.locator(this.cartItem).count();
    expect(cartItems).toBeGreaterThan(0);
  }

  async verifyCartEmpty() {
    await expect(this.page.locator(this.cartEmpty)).toBeVisible();
  }

  async removeProductFromCart(itemIndex = 0) {
    const removeButtons = this.page.locator(this.removeButton);
    if (itemIndex < await removeButtons.count()) {
      await removeButtons.nth(itemIndex).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async updateQuantity(itemIndex = 0, quantity = 2) {
    const quantityInputs = this.page.locator(this.quantityInput);
    if (itemIndex < await quantityInputs.count()) {
      await quantityInputs.nth(itemIndex).fill(quantity.toString());
    }
  }

  async proceedToCheckout() {
    await this.page.click(this.proceedCheckoutButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalPrice() {
    const prices = await this.page.locator(this.productPrice).allTextContents();
    return prices;
  }
}

module.exports = CartPage;
