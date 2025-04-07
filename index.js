// {
//   "name": "automated-script",
//   "version": "1.0.0",
//   "main": "index.js",
//   "scripts": {
//     "start": "node index.js",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "type": "commonjs",
//   "description": "",
//   "dependencies": {
//     "puppeteer": "^24.6.0"
//   }
// }

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false, // set to true to run headlessly
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Navigate to the target page
// //   await page.goto('https://www.thapatechnical.com', { waitUntil: 'networkidle2' });
//   await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });

//   try {
//     // Wait for and click `.ias_trigger a`
//     await page.waitForSelector('.ias_trigger a', { timeout: 10000 });
//     await page.click('.ias_trigger a');
//     console.log("✅ Clicked .ias_trigger link");

//     // Wait and click #confirmBtn
//     await page.waitForTimeout(3000);
//     await page.waitForSelector('#confirmBtn', { timeout: 10000 });
//     await page.click('#confirmBtn');
//     console.log("✅ Clicked #confirmBtn");
//   } catch (err) {
//     console.error("⚠️ Error automating clicks:", err.message);
//   }

//   // Keep the browser open for observation
//   // await browser.close(); // Uncomment to auto-close when done
// })();



// javascript:(function(){
//   var script = document.createElement('script');
//   script.src='//cdv.jsdelivr.net/npm/eruda';
//   document.body.appendChild(script)
//   script.onload = function (){
//     eruda.init()
//   }
  
// })();



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
    const [agreeButton] = await page.$x("//button[contains(text(), 'Agree')]");
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
