
import {
  BeforeAll,
  AfterAll,
  After,
  ITestCaseHookParameter,
  setDefaultTimeout,
  Status,
  Before,
} from "@cucumber/cucumber";
import { chromium, Page, Browser, request } from "@playwright/test";
import { fixture } from "./pageFixture.ts";
import testData from "./helper/util/test-data.json" assert { type: "json" };
import path from "path";
import fs from "fs";
//import { ApiService } from "./apiService";
let page: Page;
let browser: Browser;
setDefaultTimeout(60 * 1000);
 
BeforeAll(async function () {
 
  // Initialize Allure reporter
     // Clean previous reports
  //  allureReporter.cleanPreviousReports();;
  const rawHeadless = testData.headlessvalue;
  const hValue: boolean =
    typeof rawHeadless === "string"
      ? rawHeadless.toLowerCase() === "true"
      : Boolean(rawHeadless);
  browser = await chromium.launch({ headless: hValue, timeout: 900000 });
  const context = await browser.newContext();
  page = await context.newPage();
  //page = await browser.newPage();
  //await page.setViewportSize({ width: 1920, height: 1080 });
  fixture.page = page;
  // initialize APIRequestContext and ApiService for reuse
  /* fixture.apiRequest = await request.newContext();
  fixture.api = new ApiService(fixture.apiRequest); */
});
AfterAll(async function () {
   await fixture.page.close();
   await browser.close();
   /*  // Check if cucumber JSON exists and generate Allure report
    if (allureReporter.checkCucumberJson()) {
        try {
            await allureReporter.generateAllureReport();
            console.log('📊 Allure report generation completed from Cucumber JSON');
        } catch (error) {
            console.error('💥 Failed to generate Allure report:', error);
        }
    } else {
        console.log('⚠️  No Cucumber JSON found. Skipping Allure report generation.');
    } */
 
// Rename cucumber-report.html to a timestamped file in reports folder
 
  try {/* 
    const reportsDir = path.join(__dirname, "../../reports");
    const oldReport = "cucumber-report.html";
    //const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const timestamp = new Date().toISOString().split("T")[0] + "_" + new Date().toISOString().split("T")[1].slice(0, 8).replace(/:/g, "-");
 
    const newReport = path.join(reportsDir, `cucumber-report-${timestamp}.html`);
    if (fs.existsSync(oldReport)) {
      fs.renameSync(oldReport, newReport);
      console.log(`Report renamed to: ${newReport}`);
    } else {
      console.log("No cucumber-report.html found to rename.");
    } */
  } catch (err) {
    //console.error("Error renaming report file:", err);
  }  
 
 
  // Send email report after all tests complete
  try {
  //  console.log("Sending test report via email...");
   // emailReporter = new EmailReporter();
    //  await emailReporter.sendReport();
  } catch (error) {
    //console.error("Failed to send email report:", error);
  }
 
  
});
Before(async function (scenario) {
console.log(`\n🚀 🚀 🚀  Starting Scenario: ${scenario.pickle.name}  🚀 🚀 🚀`);
 
  // Start Allure step tracking
  //allureReporter.startStepTracking();
});
 
After(async function ({ result }: ITestCaseHookParameter) {
  if (!fixture.page) {
    return;
  }
 
  const isFailed =
    result?.status === Status.FAILED ||
    result?.status === Status.AMBIGUOUS ||
    result?.status === Status.UNDEFINED ||
    result?.status === Status.PENDING;
  if (!isFailed) {
    return;
  }
 
  const screenshot = await fixture.page.screenshot({ fullPage: true });
  // Attachments for Allure via Cucumber's attachments API
  (this as any).attach(screenshot, "image/png");
 
  /*  const pageSource = await fixture.page.content();
  (this as any).attach(pageSource, "text/html");
 
*/
 
  // Capture the complete error message with all details
  if (result?.exception) {
    let errorMessage = "FAILURE DETAILS:\n\n";
 
    if (typeof result.exception === "string") {
      errorMessage += result.exception;
    } else if (result.exception.message) {
      errorMessage += result.exception.message;
 
      // Include the full string representation for Playwright errors
      if (result.exception.toString() !== result.exception.message) {
        errorMessage += `\n\nFull Error:\n${result.exception.toString()}`;
      }
    } else {
      errorMessage += JSON.stringify(result.exception, null, 2);
    }
 
    (this as any).attach(errorMessage, "text/plain");
  }
});

//wsfsfsdf
//sdfdf
//fsf/fssdsd
//fdfdfsdfsfs