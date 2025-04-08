// const express = require("express");
// const puppeteer = require("puppeteer");

// const app = express();
// const port = 3000;

// app.get("/", async (req, res) => {
//   res.send("hello form the server");
// });

// app.get("/trigger", async (req, res) => {
//   const browser = await puppeteer.launch({
//     headless: false, // set to true to run headlessly
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Navigate to the target page
//   await page.goto(
//     "https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01",
//     { waitUntil: "networkidle2" }
//   );

//   try {
//     // Wait for and click the button with text "Apply for service"
//     await page.waitForSelector("button.click-img", { timeout: 20000 });
//     await page.click("button.click-img");
//     console.log("✅ Clicked the first button");

//     // Wait for the page to navigate
//     await page.waitForNavigation({ waitUntil: "networkidle0" });

//     // Second button (from the second screenshot)
//     await page.waitForSelector("#submitOTP", { timeout: 10000 });
//     await page.click("#submitOTP");
//     console.log("✅ Clicked the second button");

//     res.send("Automation completed successfully!");
//   } catch (err) {
//     console.error("⚠️ Error automating clicks:", err.message);
//     res.status(500).send("Error during automation: " + err.message);
//   }

//   // Uncomment the line below to close the browser after the automation completes
//   await browser.close();
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://google.com");

    // ... do your Puppeteer work ...

    res.status(200).send("Success!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

// const chromium = require("chrome-aws-lambda");
// const puppeteer = require("puppeteer-core");
// const express = require("express");

// const app = express();
// const port = 3000;

// app.get("/", async (req, res) => {
//   res.send("hello from the server");
// });

// app.get("/trigger", async (req, res) => {
//   // Launch headless (cannot do headless: false in most serverless environments)
//   const browser = await puppeteer.launch({
//     args: chromium.args,
//     executablePath: await chromium.executablePath,
//     headless: chromium.headless,
//     defaultViewport: chromium.defaultViewport,
//   });

//   const page = await browser.newPage();
//   await page.goto(
//     "https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01",
//     { waitUntil: "networkidle2" }
//   );

//   try {
//     // Wait for and click the button with text "Apply for service"
//     await page.waitForSelector("button.click-img", { timeout: 20000 });
//     await page.click("button.click-img");
//     console.log("✅ Clicked the first button");

//     // Wait for the page to navigate
//     await page.waitForNavigation({ waitUntil: "networkidle0" });

//     // Second button
//     await page.waitForSelector("#submitOTP", { timeout: 10000 });
//     await page.click("#submitOTP");
//     console.log("✅ Clicked the second button");

//     res.send("Automation completed successfully!");
//   } catch (err) {
//     console.error("⚠️ Error automating clicks:", err.message);
//     res.status(500).send("Error during automation: " + err.message);
//   } finally {
//     await browser.close();
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
