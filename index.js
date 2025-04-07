// api/trigger.js

const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;
  try {
    // **IMPORTANT**: await the executablePath call
    const executablePath = await chromium.executablePath;

    // Launch puppeteer with correct path
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,             // pass the resolved string here
      headless: chromium.headless, // usually "true" in serverless
    });

    const page = await browser.newPage();
    await page.goto(
      'https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01',
      { waitUntil: 'networkidle2' }
    );

    // Example: wait for an element, click it
    // (You can adjust the waiting approach if needed)
    await page.waitForSelector('button');
    const buttons = await page.$$('button');
    if (buttons.length > 0) {
      await buttons[0].click();
      console.log('✅ Clicked first button');
    }

    // Respond success
    return res.status(200).send('Automation completed successfully!');
  } catch (err) {
    console.error('⚠️ Error automating clicks:', err.message);
    return res.status(500).send('Error during automation: ' + err.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
