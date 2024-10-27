// @ts-check

const { test, expect, request } = require("@playwright/test");
const data = require("../../utils/apiData.json");
const generator = require("../../utils/generator");

test.describe("Store API Tests", () => {
  const id = generator.generateRandomId();
  let orderId;

  test("Post request to Place an order for a pet", async ({ request }) => {
    data.orderRequest.id = id;
    const response = await request.post(
      `https://petstore.swagger.io/v2/store/order`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: data.orderRequest,
      },
    );

    await expect(response.status()).toBe(200);
    expect(response).toBeTruthy();
    const responseBody = await response.json();
    orderId = responseBody.id;

    await expect(responseBody).toHaveProperty("id");
    await expect(responseBody).toHaveProperty("petId");
    await expect(responseBody).toHaveProperty("quantity");
    await expect(responseBody).toHaveProperty("complete");
    await expect(responseBody).toHaveProperty("status");
  });

  test("Get request to Find purchase order By ID", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );

    await expect(response.status()).toBe(200);
    expect(response).toBeTruthy();
    const responseBody = await response.json();

    await expect(responseBody).toHaveProperty("id");
    await expect(responseBody).toHaveProperty("petId");
    await expect(responseBody).toHaveProperty("quantity");
    await expect(responseBody).toHaveProperty("complete", expect.any(Boolean));
    await expect(responseBody).toHaveProperty("status", expect.any(String));
  });

  test("DELETE request to Delete purchase order By ID", async ({ request }) => {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );

    await expect(response.status()).toBe(200);
    expect(response).toBeTruthy();
    const responseBody = await response.json();

    await expect(responseBody).toEqual({
      code: 200,
      type: "unknown",
      message: orderId.toString(),
    });
  });
});
