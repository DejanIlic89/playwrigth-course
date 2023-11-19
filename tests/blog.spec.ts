import { test, expect } from "@playwright/test";
import BlogPage from "../pages/blog.page";

test.describe("Blog", () => {
  let blogPage: BlogPage;
  test("Verify Recent Posts count and verify the length of each list item", async ({
    page,
  }) => {
    blogPage = new BlogPage(page);

    await blogPage.navigate();

    for (const el of await blogPage.recentPostsList.elementHandles()) {
      // ! -> means we will always have not null value for el.textContent
      expect((await el.textContent())!.trim().length).toBeGreaterThan(10);
    }

    expect(await blogPage.recentPostsList.count()).toEqual(5);
  });
});
