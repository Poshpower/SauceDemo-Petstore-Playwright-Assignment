// @ts-check

const { test, expect, request } = require("@playwright/test");
const data = require("../../utils/apiData.json");
const generator = require("../../utils/generator");

test.describe("Pet Store API Tests", () => {
  const id = generator.generateRandomId();
  let petId;

  test("Post request to add a new pet to the store", async ({ request }) => {
    data.petData.id = id;
    const response = await request.post("https://petstore.swagger.io/v2/pet", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      data: data.petData,
    });

    await expect(response.status()).toBe(200);
    expect(response).toBeTruthy();

    const responseBody = await response.json();
    petId = responseBody.id;

    await expect(responseBody).toEqual({
      id: expect.any(Number),
      category: data.petData.category,
      name: data.petData.name,
      photoUrls: data.petData.photoUrls,
      tags: data.petData.tags,
      status: data.petData.status,
    });
  });

  test("Get request Find the Pet By ID", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/pet/${petId}`,
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
    await expect(responseBody).toEqual(data.petData);
  });

  test("PUT request To Update an existing pet", async ({ request }) => {
    data.updatedPetData.id = petId;

    const response = await request.put("https://petstore.swagger.io/v2/pet", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      data: data.updatedPetData,
    });

    await expect(response.status()).toBe(200);
    expect(response).toBeTruthy();
    const responseBody = await response.json();
    await expect(responseBody).toEqual(data.updatedPetData);
  });

  test("DELETE request Find the Pet By ID", async ({ request }) => {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/pet/${petId}`,
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
      message: petId.toString(),
    });
  });
});
