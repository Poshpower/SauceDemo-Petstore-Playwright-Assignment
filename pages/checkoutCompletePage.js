class CheckOutCompletePage {
  constructor(page) {
    this.page = page;
  }

  async successStatus() {
    const checkoutComplete = await this.page
      .locator('[data-test="complete-header"]')
      .textContent();
    return checkoutComplete;
  }
}

export { CheckOutCompletePage };
