const APPLITOOLS_API_KEY = 't6uCV1021t9Dv9kXBRUhbTEDjK4LcX0WK0TnWG8Spa107eI110';

const webdriver = require('selenium-webdriver');
const SeleniumSDK = require('eyes.selenium');
// Runs different tests based on CLI input such as 'part1', 'part2' and so on.
const testSelector = require('./testSelector.js');

const Capabilities = webdriver.Capabilities;
const Builder = webdriver.Builder;
const By = webdriver.By;
const Eyes = SeleniumSDK.Eyes;

// Open a Chrome browser.
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

// Initialize the eyes SDK and set your private API key.
const eyes = new Eyes();

eyes.setApiKey(APPLITOOLS_API_KEY);

// Scroll the entire page
eyes.setForceFullPageScreenshot(true);

try {
  // Start the test and set the browser's viewport size.
  eyes.open(driver, testSelector.appName, testSelector.testName, {
    width: testSelector.viewportWidth,
    height: testSelector.viewportHeight
  });

  // Navigate the browser to the 'hello world!' web-site.
  driver.get(testSelector.url);

  // Visual checkpoint #1.
  eyes.checkWindow(testSelector.windowName);

  // End the test.
  eyes.close(false);
} finally {
  // Close the browser.
  driver.quit();

  // If the test was aborted before eyes.close was called ends the test as aborted.
  eyes.abortIfNotClosed();
}
