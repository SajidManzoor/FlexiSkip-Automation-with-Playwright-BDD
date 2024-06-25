/** Generated from: featureFiles\smokeTests.feature */
import { test } from "playwright-bdd";

test.describe("Smoke Tests", () => {
  test.describe.configure({"mode":"serial"});

  test.beforeAll(async ({ Given, browser, And }) => {
    await Given("a new page is created", null, { browser });
    await And("the Excel file \"data.xlsx\" is read");
    await And("the test data is extracted from \"SmokeTests\" sheet");
    await And("the card details are extracted from \"CardDetails\" sheet");
  });

  test("Login", { tag: ["@mode:serial"] }, async ({ Given, When, Then }) => {
    await Given("the user is on the login page");
    await When("the user logs in with the email address and API key from the test data the user should be logged in successfully");
  });

  test("Create Order", { tag: ["@mode:serial"] }, async ({ Given, When, And, Then }) => {
    await Given("the user selects the portal from the test data");
    await When("the user clicks on eligibility");
    await And("the user searches for the address from the test data");
    await And("the user selects the first option");
    await And("the user clicks on checkout");
    await And("the user fills in the details from the test data");
    await And("the user confirms the order");
    await And("the user fills in the Stripe details from the card details the order should be created successfully");
  });

  test("FAQ page", { tag: ["@mode:serial"] }, async ({ Given, When, Then }) => {
    await Given("the user opens the FAQ page");
    await Then("the FAQ page should be validated successfully");
  });

  test("Sign Out", { tag: ["@mode:serial"] }, async ({ Given, When, Then }) => {
    await Given("the user signs out");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $testMetaMap: ({}, use) => use(testMetaMap),
  $uri: ({}, use) => use("featureFiles\\smokeTests.feature"),
});

const testMetaMap = {
  "Login": {"pickleLocation":"11:3","tags":["@mode:serial"]},
  "Create Order": {"pickleLocation":"16:3","tags":["@mode:serial"]},
  "FAQ page": {"pickleLocation":"28:3","tags":["@mode:serial"]},
  "Sign Out": {"pickleLocation":"33:3","tags":["@mode:serial"]},
};