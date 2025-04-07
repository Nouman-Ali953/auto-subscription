
// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();
// const port = 3000;

// app.get('/',async(req,res)=>{
//     res.send("hello form the server")
// })
// app.get('/trigger', async (req, res) => {
//     const browser = await puppeteer.launch({
//         headless: false, // set to true to run headlessly
//         defaultViewport: null,
//     });

//     const page = await browser.newPage();

//     // Navigate to the target page
//     await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });

//     try {
//         // Wait for and click the button with text "Apply for service"
//         await page.waitForXPath("//button[contains(text(), 'Apply for service')]", { timeout: 10000 });
//         const [applyButton] = await page.$x("//button[contains(text(), 'Apply for service')]");
//         if (applyButton) {
//             await applyButton.click();
//             console.log("✅ Clicked 'Apply for service'");
//         }

//         // Wait for navigation and then interact with new buttons
//         await page.waitForNavigation({ waitUntil: 'networkidle0' });
        
//         // Wait and click the button with text "Agree"
//         await page.waitForXPath("//button[contains(text(), 'Agree')]", { timeout: 10000 });
//         const [agreeButton] = await page.$x("//button[contains(text(), 'agree')]");
//         if (agreeButton) {
//             await agreeButton.click();
//             console.log("✅ Clicked 'Agree'");
//         }
//         res.send("Automation completed successfully!");
//     } catch (err) {
//         console.error("⚠️ Error automating clicks:", err.message);
//         res.status(500).send("Error during automation: " + err.message);
//     }

//     // Uncomment the line below to close the browser after the automation completes
//     // await browser.close();
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01', { waitUntil: 'networkidle2' });
    
    // Do your clicks, forms, scraping, etc.

    res.status(200).send('Automation complete!');
  } catch (error) {
    console.error('Error launching Puppeteer:', error);
    res.status(500).send('Something went wrong');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
