import { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json(); // You pass raw HTML from the frontend
    let browser;

    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'),
        headless: chromium.headless,
      });
    } else {
      browser = await puppeteer.launch({
        headless: true, 
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        channel: "chrome", 
      });
    }

    const page = await browser?.newPage();
    const styledHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Resume PDF</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Bitter&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Chivo&display=swap" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=Volkhov&display=swap" rel="stylesheet">
 <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
            .resume-container {
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    await page?.setContent(styledHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page?.pdf({ format: "A4", printBackground: true , 
        margin: {
    top: '0mm',
    right: '0mm',
    bottom: '0mm',
    left: '0mm',
  },
  scale:1,
  preferCSSPageSize:true
    });
    await browser?.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
