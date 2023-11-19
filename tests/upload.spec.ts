import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";
import path from "path";

test.describe("Upload File", () => {
  let cartPage: CartPage;
  const fileName = ["logotitle.png", "3mb-file.pdf"];

  for (const name of fileName) {
    test(`should upload a ${name} file `, async ({ page }) => {
      cartPage = new CartPage(page);
      // open url
      await page.goto("https://practice.sdetunicorns.com/cart/");
      // provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);
      await cartPage.uploadComponent().uploadFile(filePath);
      // assertion
      await expect(cartPage.uploadComponent().successTxt).toContainText(
        "uploaded successfully",
        { timeout: 20000 }
      );
    });
  }

  test("should upload a test file on a hidden input field", async ({
    page,
  }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com/cart/");
    // provide test file path
    const filePath = path.join(__dirname, "../data/logotitle.png");
    // uplaod test file
    await page.setInputFiles("input#upfile_1", filePath);

    // DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    // click the submit button
    await page.locator("#upload_1").click();
    // assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });

  // test("should upload a big test file", async ({ page }) => {
  //   // open url
  //   await page.goto("https://practice.sdetunicorns.com/cart/");

  //   // provide test file path
  //   const filePath = path.join(__dirname, "../data/3mb-file.pdf");

  //   // uplaod test file
  //   await page.setInputFiles("input#upfile_1", filePath);

  //   // click the submit button
  //   await page.locator("#upload_1").click();

  //   // hardcoded sleep - WRONG WAY
  //   // await page.waitForTimeout(5000);

  //   // wait for condition
  //   // await page
  //   //   .locator("#wfu_messageblock_header_1_label_1")
  //   //   .waitFor({ state: "visible", timeout: 10000 });

  //   // assertion
  //   await expect(
  //     page.locator("#wfu_messageblock_header_1_label_1")
  //   ).toContainText("uploaded successfully", { timeout: 20000 });
  // });
});
