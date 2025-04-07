// Using puppeteer-core and chrome-aws-lambda for better compatibility in serverless environments
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });

    // Perform actions like clicking buttons based on the page
    // Example: Click on a button with text "Apply for service"
    await page.waitForXPath("//button[contains(text(), 'Apply for service')]", { timeout: 10000 });
    const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
    if (applyButton) {
      await applyButton.click();
    }

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Example: Click on a button with text "Agree"
    await page.waitForXPath("//button[contains(text(), 'Agree')]", { timeout: 10000 });
    const [agreeButton] = await page.$x("//button[contains(text(), 'Agree')]");
    if (agreeButton) {
      await agreeButton.click();
    }

    res.status(200).send('Completed actions on page');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Error running Puppeteer script: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
