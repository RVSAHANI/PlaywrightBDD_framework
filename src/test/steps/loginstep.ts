import { Given,Then } from "@cucumber/cucumber";
import LoginPage from "../../pages/login.ts";
import { fixture } from "../../hooks/pageFixture.ts";
let loginpage:LoginPage;

Given('I visit the Playwright homepage', async function () {
  loginpage = new LoginPage(fixture.page);
  loginpage.openWebsite();
});

Then('I should see the Playwright title', async function () {
  loginpage = new LoginPage(fixture.page);
  loginpage.verifyPageTitle();
  loginpage.search("Playwright BDD framework");
  loginpage.verifySearchResults();
  
});