import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("Open HomePage and verify title", async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle(
      "Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality."
    );
  });

  test("Open About page and verify title", async ({ page }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com/about");

    // verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS selector", async ({ page }) => {
    await expect(page).not.toHaveURL(/.*#get-started/);

    // click the button
    // await page.locator("#get-started").click();
    await homePage.getStartedBtn.click();

    // verify url has #get-started
    // await expect(page).toHaveURL('https://practice.sdetunicorns.com//#get-started');
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible using text selector", async () => {
    // find the text locator
    // const headingText = page.locator("text=Think different. Make different.");
    const headingText = await homePage.headingText;

    // verify heading text is visible
    await expect(headingText).toBeVisible();
  });

  test("Verify home link is enabled using text css selector", async () => {
    // find the home text
    // const homeText = page.locator('#zak-primary-menu >> text=Home');
    // const homeText = page.locator('#zak-primary-menu:has-text("Home")');

    // verify home text is enabled
    await expect(homePage.homeLink).toBeEnabled();
  });

  test("Verify search icon is visible using xpath selector", async () => {
    // find the search icon
    // const searchIcon = page.locator(
    //   '//*[@id="zak-primary-nav"]/following-sibling::*[contains(@class, "zak-header-actions")]/div[contains(@class, "zak-header-search")]'
    // );
    const searchIcon = await homePage.searchIcon;

    // verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });

  test("Verify text of all nav links", async () => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
  });
});
