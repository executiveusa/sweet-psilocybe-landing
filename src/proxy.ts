import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store for API endpoints (in production, back with Redis if high traffic)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const API_GET_RATE_LIMIT = 60; // 60 API GET requests per minute per IP
const API_MUTATION_RATE_LIMIT = 20; // 20 API POST/PUT/DELETE requests per minute per IP

function getRateLimitKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
}

function checkRateLimit(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (rateLimitMap.size > 10000) {
    rateLimitMap.forEach((value, k) => {
      if (value.resetTime < now) rateLimitMap.delete(k);
    });
  }

  if (!record || record.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= maxRequests) return false;

  record.count++;
  return true;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never rate-limit standard page navigations or Next.js RSC prefetches (?_rsc=)
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const isMutation = request.method !== 'GET' && request.method !== 'HEAD';
  const limit = isMutation ? API_MUTATION_RATE_LIMIT : API_GET_RATE_LIMIT;
  const key = `api:${isMutation ? 'write' : 'read'}:${getRateLimitKey(request)}`;

  if (!checkRateLimit(key, limit)) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Please slow down and try again in a moment.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
