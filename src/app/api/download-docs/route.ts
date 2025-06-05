export const runtime = 'nodejs';
import { NextRequest } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function POST(req: NextRequest) {
  const { html, title = 'resume' } = await req.json();

  if (!html) {
    return new Response(JSON.stringify({ error: 'Missing HTML content' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse and convert minimal HTML to text (or custom logic to split into sections)
  const plainText = html.replace(/<[^>]*>?/gm, ''); // Simple tag remover

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun(plainText)],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${title}.docx"`,
    },
  });
}
