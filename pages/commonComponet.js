class CommonComponet {
  constructor(page) {
    this.page = page;
  }

  get cartBadge() {
    return this.page.locator(".shopping_cart_badge");
  }

  async clickCartIcon() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async cartBadgeCount() {
    const badgeCount = await cartBadge().textContent();
    return badgeCount;
  }
}
export { CommonComponet };
