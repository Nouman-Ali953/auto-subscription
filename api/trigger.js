const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;

  try {
    const executablePath = await chromium.executablePath(); // ✅ fix here

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto(
      'https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01',
      { waitUntil: 'networkidle2' }
    );

    await page.waitForSelector('button');

    const buttons = await page.$$('button');
    if (buttons.length > 0) {
      await buttons[0].click();
      console.log('✅ Clicked first button');
    }

    return res.status(200).send('Automation completed successfully!');
  } catch (err) {
    console.error('⚠️ Error automating clicks:', err.message);
    return res.status(500).send('Error during automation: ' + err.message);
  } finally {
    if (browser) await browser.close();
  }
};
