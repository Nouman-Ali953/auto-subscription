// const express = require("express");
// const puppeteer = require("puppeteer");

// const app = express();
// const port = 3000;

// app.get("/", async (req, res) => {
//   res.send("hello form the server");
// });

// app.get("/trigger", async (req, res) => {
//   // const browser = await puppeteer.launch({
//   //   executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, 
//   //   headless: true, // set to true to run headlessly
//   //   args: [
//   //     '--no-sandbox',
//   //     '--disable-setuid-sandbox'
//   //   ],
//   //   defaultViewport: null,
//   // });

//   // Use the environment variable we defined in Dockerfile
//   const browser = await puppeteer.launch({
//     executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, 
//     // It's typical to run headless in Docker
//     headless: true, 
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox'
//     ],
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
//     await page.waitForSelector("#submitOTP", { timeout: 20000 });
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




const app = require("express")();

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/", async (req, res) => { res.send("hello from server")})  

app.get("/api", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      // headless: false,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
    await page.goto("https://developer.chrome.com/");
    await page.setViewport({ width: 1080, height: 1024 });

    await page.type(".devsite-search-field", "automate beyond recorder");

    await page.waitForSelector(".devsite-result-item-link", { timeout: 30000 });
    await page.click(".devsite-result-item-link");

    await page.waitForSelector("h1");

    const fullTitle = await page.evaluate(() => {
      const el = document.querySelector("h1");
      return el ? el.textContent : "No title found";
    });

    await browser.close();
    res.send(await fullTitle);
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;


    