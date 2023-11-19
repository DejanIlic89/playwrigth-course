import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import apiController from "../controller/api.controller";
// import { faker } from "@faker-js/faker";

test.describe("Contact", () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse

  test.beforeAll(async ({ playwright }) => {
    // fakerApi = await playwright.request.newContext({
    //   baseURL: "https://jsonplaceholder.typicode.com/"
    // });

    await apiController.init();
    randomPerson = await apiController.getUser();
    const newUserToDo = await apiController.createUserToDo();
    console.log(newUserToDo);

    // const response = await fakerApi.get('users');
    // const responseBody = await response.json();
    // randomPerson = responseBody[0];

    // const postResponse = await fakerApi
    //   .post('/users/1/todos', {
    //     data: {
    //       "title": "Learn Playwright",
    //       "completed": "false"
    //     }
    //   });
    
    // const postResponseBody = await postResponse.json();
    // console.log(postResponseBody);
  })

  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    await contactPage.navigate();

    // await contactPage.submitForm(
    //   faker.person.fullName(),
    //   faker.internet.email(),
    //   faker.phone.number(),
    //   faker.lorem.paragraphs(2)
    // );

    await contactPage.submitForm(
      randomPerson['name'],
      randomPerson['email'],
      randomPerson['phone'],
      randomPerson['website']
    );

    await expect(contactPage.successTxt).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
