import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }

    // In production, you would send this to your analytics service
    // Example: send to Vercel Analytics, Google Analytics, etc.
    // await sendToAnalytics(metric);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to log metric' }, { status: 500 });
  }
}
