

// api/trigger.js

const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
    let browser;
  
    try {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath, // <-- Use `await` here!
        headless: chromium.headless,                  // or 'new' / true
      });
    const page = await browser.newPage();
    await page.goto(
      'https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01',
      { waitUntil: 'networkidle2' }
    );

    // --- Perform your actions, similar to your original script ---
    await page.waitForXPath("//button[contains(text(), 'Apply for service')]", {
      timeout: 10000
    });

    const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
    if (applyButton) {
      await applyButton.click();
      console.log("✅ Clicked 'Apply for service'");
    }

    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Click "agree"
    await page.waitForXPath("//button[contains(text(), 'agree')]", { timeout: 10000 });
    const [agreeButton] = await page.$x("//button[contains(text(), 'agree')]");
    if (agreeButton) {
      await agreeButton.click();
      console.log("✅ Clicked 'Agree'");
    }

    res.status(200).send('Automation completed successfully!');
  } catch (err) {
    console.error("⚠️ Error automating clicks:", err.message);
    res.status(500).send("Error during automation: " + err.message);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
