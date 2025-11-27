import { Page, expect} from "@playwright/test";

export default class LoginPage{

constructor(public page :Page){}



 get googleSearch() {
    return this.page.getByRole('combobox', { name: 'Search' });
  }

  get searchResults() {
    return this.page.locator('#search');
  }

  // Open Google
  async openWebsite(): Promise<void> {
    await this.page.goto("https://www.google.com");
    console.log("Website opened");
    await this.page.waitForLoadState("load");
  }

  // Verify the page title
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle("Google");
    console.log("Title verified: Google");
  }

  // Search for a keyword
  async search(keyword: string): Promise<void> {
    await this.googleSearch.fill(keyword);
    await this.googleSearch.press("Enter");
    console.log(`Search completed for: ${keyword}`);
  }

  // Verify that search results are visible
  async verifySearchResults(): Promise<void> {
    await expect(this.searchResults).toBeVisible();
    console.log("Search results are displayed");

    await this.page.locator('#item-to-be-dragged').hover();
await this.page.mouse.down();
await this.page.locator('#item-to-drop-at').hover();
await this.page.mouse.up();
  }
  
}
