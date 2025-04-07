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



// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false, // set to true to run headlessly
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Navigate to the target page
//   await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });

//   try {
//     // Wait for and click the button with text "Apply for service"
//     await page.waitForXPath("//button[contains(text(), 'Apply for service')]", { timeout: 10000 });
//     const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
//     if (applyButton) {
//       await applyButton.click();
//       console.log("✅ Clicked 'Apply for service'");
//     }

//     // Wait for navigation and then interact with new buttons
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
//     // Wait and click the button with text "Agree"
//     await page.waitForXPath("//button[contains(text(), 'Agree')]", { timeout: 10000 });
//     const [agreeButton] = await page.$x("//button[contains(text(), 'Agree')]");
//     if (agreeButton) {
//       await agreeButton.click();
//       console.log("✅ Clicked 'Agree'");
//     }
//   } catch (err) {
//     console.error("⚠️ Error automating clicks:", err.message);
//   }

//   // Keep the browser open for observation
//   // await browser.close(); // Uncomment to auto-close when done
// })();


const express = require('express');
const chromium = require('chrome-aws-lambda');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
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

    // Your Puppeteer code here, e.g., clicking a button
    // Here is a sample of how to click a button by its text
    const [button] = await page.$x("//button[contains(., 'Apply for service')]");
    if (button) {
      await button.click();
    }

    // Capture some result, like page title
    const title = await page.title();
    res.send(`Page title is: ${title}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Error running Puppeteer script: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
