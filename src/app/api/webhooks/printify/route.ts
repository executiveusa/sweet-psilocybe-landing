import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const eventType = request.headers.get('x-printify-event');
    const body = await request.json();

    console.log(`Received Printify Webhook: ${eventType}`);

    switch (eventType) {
      case 'order:updated':
        console.log('Order updated:', body.id);
        break;
      case 'order:shipment:created':
      case 'order:shipment:updated':
        console.log('Shipment event:', body.id);
        break;
      default:
        console.log('Unhandled Printify event type:', eventType);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
