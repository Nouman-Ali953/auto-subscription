const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send("hello form the server");
});

app.get("/trigger", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false, // set to true to run headlessly
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto(
    "https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01",
    { waitUntil: "networkidle2" }
  );

  try {
    // Wait for and click the button with text "Apply for service"
    await page.waitForSelector("button.click-img", { timeout: 10000 });
    await page.click("button.click-img");
    console.log("✅ Clicked the first button");

    // Wait for the page to navigate
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Second button (from the second screenshot)
    await page.waitForSelector("#submitOTP", { timeout: 10000 });
    await page.click("#submitOTP");
    console.log("✅ Clicked the second button");

    res.send("Automation completed successfully!");
  } catch (err) {
    console.error("⚠️ Error automating clicks:", err.message);
    res.status(500).send("Error during automation: " + err.message);
  }

  // Uncomment the line below to close the browser after the automation completes
  await browser.close();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
