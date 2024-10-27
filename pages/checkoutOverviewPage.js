class CheckOutOverviewPage {
  constructor(page) {
    this.page = page;
  }

  async clickButtonFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
export { CheckOutOverviewPage };
