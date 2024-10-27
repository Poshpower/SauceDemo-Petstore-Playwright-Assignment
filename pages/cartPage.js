class CartPage {
  constructor(page) {
    this.page = page;
  }

  async cartContents() {
    const content = await this.page.$$eval("div.inventory_item_name", (items) =>
      items.map((item) => item.textContent),
    );
    return content;
  }

  async clickCheckoutButton() {
    await this.page.locator(`//button[@data-test='checkout']`).click();
  }
}
export { CartPage };
