const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;
  try {
    // 1. Launch puppeteer-core with a serverless-compatible Chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless, 
    });

    const page = await browser.newPage();

    // 2. Go to your desired page
    await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', {
      waitUntil: 'networkidle2'
    });

    // 3. Wait for the "Apply for service" button via a DOM function
    await page.waitForFunction(() => {
      const xp = "//button[contains(text(), 'Apply for service')]";
      return document.evaluate(
        xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
    }, { timeout: 10000 });

    // 4. Now select it using $x() and click
    const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
    if (applyButton) {
      await applyButton.click();
      console.log("✅ Clicked 'Apply for service'");
    }

    // 5. Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // 6. Wait for the "agree" button
    await page.waitForFunction(() => {
      const xp = "//button[contains(text(), 'agree')]";
      return document.evaluate(
        xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
    }, { timeout: 10000 });

    // 7. Click "agree"
    const [agreeButton] = await page.$x("//button[contains(text(), 'agree')]");
    if (agreeButton) {
      await agreeButton.click();
      console.log("✅ Clicked 'Agree'");
    }

    // 8. Done
    return res.status(200).send("Automation completed successfully!");
  } catch (err) {
    console.error("⚠️ Error automating clicks:", err.message);
    return res.status(500).send("Error during automation: " + err.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
