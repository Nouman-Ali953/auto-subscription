// const express = require("express");
// const puppeteer = require("puppeteer");

// const app = express();
// const port = 3000;

// app.get("/", async (req, res) => {
//   res.send("hello form the server");
// });

// //comment here
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
//     // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
//     executablePath: "/usr/bin/google-chrome",
//     // It's typical to run headless in Docker
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   const page = await browser.newPage();

//   // Navigate to the target page
//   await page.goto(
//     "https://tracking.bigfunzones.com/api?svkey=4236006&telco_id=2&sub=01",
//     { waitUntil: "networkidle2" }
//   );
    
//   // https://bigfunzones.com/click-flow/aoc?reference=A2066S0KEI&tranid=67f75d700c53fe2fd41c0028&cpart=0&svname=Horo%20DDD5&svkey=00601&ptid=opra&telco=TRUEH&svdetail=2-C1-2-R1

//   try {
//     // Wait for and click the button with text "Apply for service"
//     // await page.waitForSelector("button.click-img", { timeout: 20000 });
//     // await page.click("button.click-img");
//     // console.log("✅ Clicked the first button");

//     // // Wait for the page to navigate
//     // await page.waitForNavigation({ waitUntil: "networkidle0" });

//     // // Second button (from the second screenshot)
//     // await page.waitForSelector("#submitOTP", { timeout: 20000 });
//     // await page.click("#submitOTP");
//     // console.log("✅ Clicked the second button");

//     await page.screenshot({ path: "step1-page-loaded.png" });

//     await page.waitForSelector("button.click-img", { timeout: 20000 });
//     await page.click("button.click-img");
//     console.log("✅ Clicked the first button");
//     await page.screenshot({ path: "step2-first-click.png" });

//     // await page.waitForNavigation({ waitUntil: "networkidle0" });

//     // // await page.waitForSelector("#submitOTP", { timeout: 20000 });
//     // // await page.click("#submitOTP");
//     // await page.waitForSelector("#submitOTP", { timeout: 20000, visible: true });
//     // await page.waitForTimeout(500); // just to be safe
//     // await page.click("#submitOTP");

//     // console.log("✅ Clicked the second button");
//     // await page.screenshot({ path: "step3-second-click.png" });

//     // res.send("Automation completed successfully!");

//     await page.click("button.click-img");
//     console.log("✅ Clicked the first button");
//     await page.screenshot({ path: "step2-first-click.png" });

//     // Wait for the second button or content to appear
//     try {
//       await page.waitForSelector("#submitOTP", {
//         timeout: 20000,
//         visible: true,
//       });
//       await page.waitForTimeout(1000); // small buffer just in case
//       await page.screenshot({ path: "step2.5-before-second-click.png" });
//       await page.click("#submitOTP");
//       console.log("✅ Clicked the second button");
//       await page.screenshot({ path: "step3-second-click.png" });
//       res.send("Automation completed successfully!");
//     } catch (err) {
//       console.error("⚠️ Second button not found:", err.message);
//       res.send("Automation did not complete successfully!");
//     }
//   } catch (err) {
//     console.error("⚠️ Error automating clicks:", err.message);
//     res.status(500).send("Error during automation: " + err.message);
//   }

//   // Uncomment the line below to close the browser after the automation completes
//   await browser.close();
// });

// app.listen(port, () => {
//   console.log(`Server running on http://0.0.0.0:${port}`);
//   // console.log(`Server running on http://localhost:${port}`);
// });


const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send("hello form the server");
});

//comment here
app.get("/trigger", async (req, res) => {
  // const browser = await puppeteer.launch({
  //   executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  //   headless: true, // set to true to run headlessly
  //   args: [
  //     '--no-sandbox',
  //     '--disable-setuid-sandbox'
  //   ],
  //   defaultViewport: null,
  // });

  // Use the environment variable we defined in Dockerfile
  const browser = await puppeteer.launch({
    // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    executablePath: "/usr/bin/google-chrome",
    // It's typical to run headless in Docker
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto(
    "https://bigfunzones.com/click-flow/aoc?reference=A2066S0KEI&tranid=67f75d700c53fe2fd41c0028&cpart=0&svname=Horo%20DDD5&svkey=00601&ptid=opra&telco=TRUEH&svdetail=2-C1-2-R1",
    { waitUntil: "networkidle2" }
  );
    
  // https://bigfunzones.com/click-flow/aoc?reference=A2066S0KEI&tranid=67f75d700c53fe2fd41c0028&cpart=0&svname=Horo%20DDD5&svkey=00601&ptid=opra&telco=TRUEH&svdetail=2-C1-2-R1

  try {
    // Wait for and click the button with text "Apply for service"
    // await page.waitForSelector("button.click-img", { timeout: 20000 });
    // await page.click("button.click-img");
    // console.log("✅ Clicked the first button");

    // // Wait for the page to navigate
    // await page.waitForNavigation({ waitUntil: "networkidle0" });

    // // Second button (from the second screenshot)
    // await page.waitForSelector("#submitOTP", { timeout: 20000 });
    // await page.click("#submitOTP");
    // console.log("✅ Clicked the second button");

    //   

    // await page.waitForNavigation({ waitUntil: "networkidle0" });

    // // await page.waitForSelector("#submitOTP", { timeout: 20000 });
    // // await page.click("#submitOTP");
    // await page.waitForSelector("#submitOTP", { timeout: 20000, visible: true });
    // await page.waitForTimeout(500); // just to be safe
    // await page.click("#submitOTP");

    // console.log("✅ Clicked the second button");
    // await page.screenshot({ path: "step3-second-click.png" });

    // res.send("Automation completed successfully!");

    // await page.click("button.click-img");
    // console.log("✅ Clicked the first button");
    await page.screenshot({ path: "step2-first-click.png" });

    // Wait for the second button or content to appear
    try {
      await page.waitForSelector("#submitOTP", {
        timeout: 20000,
        visible: true,
      });
      await page.waitForTimeout(2000); // small buffer just in case
      await page.screenshot({ path: "step2.5-before-second-click.png" });
      await page.click("#submitOTP");
      console.log("✅ Clicked the second button");
      await page.screenshot({ path: "step3-second-click.png" });
      res.send("Automation completed successfully!");
    } catch (err) {
      console.error("⚠️ Second button not found:", err.message);
      res.send("Automation did not complete successfully!");
    }
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
