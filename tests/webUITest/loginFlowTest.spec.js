// @ts-check

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ProductPage } from "../../pages/productPage";
const userData = require("../../utils/data.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  await loginPage.inputUsername(userData.validCredential.username);
  await loginPage.inputPassword(userData.validCredential.password);
  await loginPage.clickButtonLogin();

  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.url()).toContain("inventory.html");
  await expect(productPage.productPageTitle).toHaveText("Products");
  await expect(productPage.shoppingCartIcon).toBeVisible();
  await expect(productPage.singleProduct).toBeVisible();
  await page.close();
});

test("Unsuccessful Login(Wrong Password)", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.inputUsername(userData.wrongUser.username);
  await loginPage.inputPassword(userData.wrongUser.password);
  await loginPage.clickButtonLogin();

  await expect(page.url()).toEqual("https://www.saucedemo.com/");
  await expect(loginPage.errorText).toBeVisible();
  await expect(loginPage.errorText).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await page.close();
});

test("Unsuccessful Login (Locked Out User)", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.inputUsername(userData.lockedOutUser.username);
  await loginPage.inputPassword(userData.lockedOutUser.password);
  await loginPage.clickButtonLogin();

  await expect(page.url()).toEqual("https://www.saucedemo.com/");
  await expect(loginPage.errorText).toBeVisible();
  await expect(loginPage.errorText).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
  await page.close();
});
