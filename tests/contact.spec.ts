import { test, expect } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import { faker } from "@faker-js/faker";

test.describe("Contact", () => {
  let contactPage: ContactPage;
  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    await contactPage.navigate();

    await contactPage.submitForm(
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.paragraphs(2)
    );

    await expect(contactPage.successTxt).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
