import { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json(); // You pass raw HTML from the frontend

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      channel: 'chrome', // works with puppeteer-core if you have Chrome installed
    });

    const page = await browser.newPage();

    // Add Tailwind CDN to HTML head
    const styledHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Resume PDF</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
