

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // set to true to run headlessly
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });

  try {
    // Wait for and click the button with text "Apply for service"
    await page.waitForXPath("//button[contains(text(), 'Apply for service')]", { timeout: 10000 });
    const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
    if (applyButton) {
      await applyButton.click();
      console.log("✅ Clicked 'Apply for service'");
    }

    // Wait for navigation and then interact with new buttons
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    // Wait and click the button with text "Agree"
    await page.waitForXPath("//button[contains(text(), 'Agree')]", { timeout: 10000 });
    const [agreeButton] = await page.$x("//button[contains(text(), 'agree')]");
    if (agreeButton) {
      await agreeButton.click();
      console.log("✅ Clicked 'Agree'");
    }
  } catch (err) {
    console.error("⚠️ Error automating clicks:", err.message);
  }

  // Keep the browser open for observation
  // await browser.close(); // Uncomment to auto-close when done
})();
