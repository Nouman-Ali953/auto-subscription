const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false, // set to true for headless mode
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // mobile-like size
    userAgent: 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 Chrome/90.0.0.0 Mobile Safari/537.36',
  });

  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to subscription URL...');
    await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', {
      waitUntil: 'networkidle',
    });

    // Wait for any button to appear
    await page.waitForSelector('button', { timeout: 10000 });

    const buttons = await page.$$('button');
    if (buttons.length > 0) {
      await buttons[0].click();
      console.log('✅ Clicked the first button!');
    } else {
      console.log('❌ No buttons found!');
    }
  } catch (error) {
    console.error('⚠️ Automation failed:', error.message);
  } finally {
    await browser.close();
  }
})();
