const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send("hello form the server");
});  

app.get("/trigger", async (req, res) => {
  // Use the environment variable we defined in Dockerfile
  const browser = await puppeteer.launch({
    // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    executablePath: "/usr/bin/google-chrome",
    // It's typical to run headless in Docker
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto(
    "https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01",
    { waitUntil: "networkidle2" }
  );
        
  try {
    await page.screenshot({ path: "step1-page-loaded.png" });

    await page.waitForSelector("button.click-img", { timeout: 20000 });
    await page.click("button.click-img");
    console.log("✅ Clicked the first button");
    await page.screenshot({ path: "step2-first-click.png" });

    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.screenshot({ path: "step3-page-loaded.png" });

    // await page.waitForSelector("#submitOTP", { timeout: 20000 });
    // await page.click("#submitOTP");
    await page.waitForSelector("#submitOTP", { timeout: 20000, visible: true });
    await page.waitForTimeout(500); // just to be safe
    await page.click("#submitOTP");

    console.log("✅ Clicked the second button");
    await page.screenshot({ path: "step3-second-click.png" });

    res.send("Automation completed successfully!");
  } catch (err) {
    console.error("⚠️ Error automating clicks:", err.message);
    res.status(500).send("Error during automation: " + err.message);
  }

  // Uncomment the line below to close the browser after the automation completes
  await browser.close();
});

app.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
  // console.log(`Server running on http://localhost:${port}`);
});
