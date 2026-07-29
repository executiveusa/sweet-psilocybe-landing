import { NextResponse } from 'next/server';

export async function GET() {
  const PRINTIFY_API_TOKEN = process.env.PRINTIFY_API_TOKEN;
  const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

  if (!PRINTIFY_API_TOKEN || !PRINTIFY_SHOP_ID) {
    console.warn('Printify credentials missing, returning mock data.');
    return NextResponse.json([
      {
        id: '1',
        title: 'Mycelium Network Tee',
        description: 'Premium organic cotton tee featuring intricate mycelium network artwork.',
        price: '$35.00',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3'
      }
    ], { status: 200 });
  }

  try {
    const res = await fetch(`https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/products.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Printify API error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching Printify products:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}
