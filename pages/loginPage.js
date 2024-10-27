class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async inputUsername(username) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async inputPassword(password) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickButtonLogin() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickButtonLogin();
  }

  get errorText() {
    return this.page.locator('h3[data-test="error"]');
  }
}
export { LoginPage };
