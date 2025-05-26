// utils/htmlTemplate.ts

export function buildHTML(content: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resume</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
      * {
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="p-4">
      ${content}
    </div>
  </body>
  </html>
  `;
}
