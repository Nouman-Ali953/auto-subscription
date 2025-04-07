// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// Puppeteer Extras
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Pull the full puppeteer executablePath:
const { executablePath } = require('puppeteer');

// Use the stealth plugin:
puppeteer.use(StealthPlugin());

// export default async function handler(req, res) {
 async function handler(req, res) {
  let browser;
  try {
    // Launch Puppeteer with an explicit path to the Chromium
    browser = await puppeteer.launch({
      headless: false,            // Change to `true` if you want to hide the browser UI
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox'],
      executablePath: executablePath(), // <--- Key difference here
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1280, deviceScaleFactor: 1 });

    // Go to your target page
    await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', {
      waitUntil: 'networkidle2',
    });

    // Wait for and click "Apply for service"
    await page.waitForXPath("//button[contains(text(), 'Apply for service')]", { timeout: 10000 });
    const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
    if (applyButton) {
      await applyButton.click();
      console.log("✅ Clicked 'Apply for service'");
    }

    // Wait for next navigation
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Wait for and click "agree"
    await page.waitForXPath("//button[contains(text(), 'agree')]", { timeout: 10000 });
    const [agreeButton] = await page.$x("//button[contains(text(), 'agree')]");
    if (agreeButton) {
      await agreeButton.click();
      console.log("✅ Clicked 'Agree'");
    }

    // Done
    res.status(200).send('Automation completed successfully!');
  } catch (error) {
    console.error('⚠️ Error automating clicks:', error.message);
    res.status(500).send('Error during automation: ' + error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// If you're running locally (e.g., `node automation.js`), you might test the function like this:
if (require.main === module) {
  // Simulate a local call:
  handler(
    { /* mock request */ }, 
    { 
      status: (code) => ({
        send: (msg) => console.log(`Status ${code}: ${msg}`)
      })
    }
  );
}
