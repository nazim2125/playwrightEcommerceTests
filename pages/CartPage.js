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
    this.productQuantity = '.cart_quantity button';
  }

  async navigateToCart() {
    await this.goto('/view_cart');
  }

  async verifyCartPageLoaded() {
    await this.waitForPageLoad();
    await this.waitForVisible(this.cartItem);
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartItem).count();
  }

  async getNumberOfItemsInCart() {
    return await this.getCartItemCount();
  }

  async verifyCartNotEmpty() {
    await this.waitForVisible(this.cartItem);
    const cartItems = await this.page.locator(this.cartItem).count();
    if (cartItems === 0) {
      throw new Error('Expected cart to contain at least one item');
    }
  }

  async verifyCartEmpty() {
    await this.waitForVisible(this.cartEmpty);
  }

  async removeProductFromCart(itemIndex = 0) {
    const removeButtons = this.page.locator(this.removeButton);
    const initialCount = await this.getCartItemCount();

    if (itemIndex < await removeButtons.count()) {
      const button = removeButtons.nth(itemIndex);
      await button.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await button.scrollIntoViewIfNeeded();
      await button.click({ force: true, timeout: this.defaultTimeout });
      await this.page.waitForFunction(
        ({ selector, count }) => document.querySelectorAll(selector).length < count,
        { selector: this.cartItem, count: initialCount },
        { timeout: this.defaultTimeout }
      );
    }
  }

  async removeFirstItem() {
    await this.removeProductFromCart(0);
  }

  async updateQuantity(itemIndex = 0, quantity = 2) {
    const quantityInputs = this.page.locator(this.quantityInput);
    if (itemIndex < await quantityInputs.count()) {
      await quantityInputs.nth(itemIndex).waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await quantityInputs.nth(itemIndex).fill(quantity.toString());
      return true;
    }

    return false;
  }

  async getItemQuantity(itemIndex = 0) {
    const quantity = this.page.locator(this.productQuantity).nth(itemIndex);
    await quantity.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    return Number.parseInt(await quantity.textContent(), 10);
  }

  async proceedToCheckout() {
    await this.click(this.proceedCheckoutButton);
    await this.waitForPageLoad();
  }

  async getTotalPrice() {
    await this.waitForVisible(this.productPrice);
    const prices = await this.page.locator(this.productPrice).allTextContents();
    return prices;
  }
}

module.exports = CartPage;
