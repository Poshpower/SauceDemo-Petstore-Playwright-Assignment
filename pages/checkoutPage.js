class CheckOutPage {
  constructor(page) {
    this.page = page;
  }

  async inputFirstName(firstname) {
    await this.page.locator('[data-test="firstName"]').fill(firstname);
  }

  async inputLastName(lastname) {
    await this.page.locator('[data-test="lastName"]').fill(lastname);
  }

  async inputZipCode(zipCode) {
    await this.page.locator('[data-test="postalCode"]').fill(zipCode);
  }

  async clickButtonContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }
}
export { CheckOutPage };
