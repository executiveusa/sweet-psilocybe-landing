import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const PRINTIFY_API_TOKEN = process.env.PRINTIFY_API_TOKEN;

  if (!PRINTIFY_API_TOKEN) {
    return NextResponse.json({ error: 'Missing Printify credentials' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { file_name, url } = body;

    if (!file_name || !url) {
      return NextResponse.json({ error: 'Missing file_name or url in body' }, { status: 400 });
    }

    const res = await fetch('https://api.printify.com/v1/uploads/images.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ file_name, url })
    });

    if (!res.ok) {
      throw new Error(`Printify upload error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({ id: data.id, url: data.url }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading image to Printify:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload image' }, { status: 500 });
  }
}
