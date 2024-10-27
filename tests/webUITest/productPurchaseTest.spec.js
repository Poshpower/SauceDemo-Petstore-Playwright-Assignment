// @ts-check

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ProductPage } from "../../pages/productPage";
import { ProductDetailsPage } from "../../pages/productDetailsPage";
import { CommonComponet } from "../../pages/commonComponet";
import { CartPage } from "../../pages/cartPage";
import { CheckOutPage } from "../../pages/checkoutPage";
import { CheckOutOverviewPage } from "../../pages/checkoutOverviewPage";
import { CheckOutCompletePage } from "../../pages/checkoutCompletePage";
const userData = require("../../utils/data.json");

const loginAndSelectProduct = async (page, productId) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await productPage.selectProduct(productId);
  await productPage.viewProductDeatilsPage(productId);
  await productDetailsPage.addToCart();
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Sort the Product Page based on Price", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const filterOption = "lohi";

  await loginPage.login("standard_user", "secret_sauce");
  await productPage.selectFilterField(filterOption);
  await productPage.waitForNavigation();
  const prices = await productPage.productPrices();
  const isSorted = await productPage.isSorted(prices);
  await expect(isSorted).toBeTruthy();

  await page.close();
});

test("Select product and view in Product details page", async ({ page }) => {
  const commonComponet = new CommonComponet(page);
  const cartPage = new CartPage(page);
  const productId = 4;

  await loginAndSelectProduct(page, productId);
  await expect(commonComponet.cartBadge).toBeVisible();
  await expect(commonComponet.cartBadge).toHaveText("1");
  await commonComponet.clickCartIcon();
  const contents = await cartPage.cartContents();
  await expect(contents).toContain("Sauce Labs Backpack");

  await page.close();
});

test("Checkout from Cart", async ({ page }) => {
  const commonComponet = new CommonComponet(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckOutPage(page);
  const checkOutOverviewPage = new CheckOutOverviewPage(page);
  const checkOutCompletePage = new CheckOutCompletePage(page);
  const productId = 4;

  await loginAndSelectProduct(page, productId);
  await commonComponet.clickCartIcon();
  await cartPage.clickCheckoutButton();
  await checkoutPage.inputFirstName(userData.user.firtName);
  await checkoutPage.inputLastName(userData.user.lastName);
  await checkoutPage.inputZipCode(userData.user.postalcode);
  await checkoutPage.clickButtonContinue();
  await checkOutOverviewPage.clickButtonFinish();
  const checkoutComplete = await checkOutCompletePage.successStatus();
  await expect(checkoutComplete).toContain("Thank you for your order!");

  await page.close();
});
