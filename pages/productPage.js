class ProductPage {
  constructor(page) {
    this.page = page;
  }

  productId(count) {
    const locators = [];
    for (let i = 1; i <= count; i++) {
      const locator = this.page.locator(`[id='item_${i}_title_link']`);
      locators.push(locator);
    }
    return locators;
  }

  get shoppingCartIcon() {
    return this.page.locator("div#shopping_cart_container");
  }

  get productPageTitle() {
    return this.page.locator('//span[@class="title"]');
  }

  get singleProduct() {
    return this.page
      .locator(
        "//div[@class='inventory_list']//div[@data-test='inventory-item']",
      )
      .first();
  }

  allProductById(productId) {
    return this.page.getByRole(`#item_${productId}_title_link`);
  }

  get inventoryList() {
    return this.page.locator(
      "//div[@class='inventory_list']//div[@data-test='inventory-item']",
    );
  }
  getProductName(itemNumber) {
    return this.page.locator(
      `//a[@id='item_${itemNumber}_title_link']/div[@data-test='inventory-item-name']`,
    );
  }

  async selectProduct(itemNumber) {
    const products = await this.page.$$(
      `//a[@id='item_${itemNumber}_title_link']/div[@data-test='inventory-item-name']`,
    );
    for (const product of products) {
      const productName = await product.textContent();
      if (productName) {
        product.hover();
      }
    }
  }

  async viewProductDeatilsPage(itemNumber) {
    const products = await this.page.$$(
      `//a[@id='item_${itemNumber}_title_link']/div[@data-test='inventory-item-name']`,
    );
    for (const product of products) {
      const productName = await product.textContent();
      if (productName) {
        product.click();
        await this.page.waitForNavigation();
        break;
      }
    }
  }

  async selectFilterField(options) {
    await this.page.selectOption(
      '[data-test="product-sort-container"]',
      options,
    );
  }

  async productPrices() {
    const priceText = await this.page.$$eval(
      '[data-test="inventory-item-price"]',
      (prices) => prices.map((price) => price.textContent.trim()),
    );
    const productPrices = priceText.map((priceText) =>
      parseFloat(priceText.replace("$", "")),
    );
    return productPrices;
  }

  async waitForNavigation() {
    await this.page.locator('[data-test="header-container"]');
  }

  isSorted(prices) {
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[i - 1]) {
        return false;
      }
    }
    return true;
  }
}

export { ProductPage };
