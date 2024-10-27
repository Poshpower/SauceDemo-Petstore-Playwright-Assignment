class ProductDetailsPage {
  constructor(page) {
    this.page = page;
  }

  get productName() {
    return this.page.locator(`//div[@data-test='inventory-item-name']`);
  }

  async addToCart() {
    return await this.page
      .locator("//button[@data-test='add-to-cart']")
      .click();
  }

  async removeFromCart() {
    return await this.page.locator("//button[@data-test='remove']").click();
  }
}

export { ProductDetailsPage };
