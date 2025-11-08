import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute
const API_RATE_LIMIT = 10; // 10 API requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or a combination of IP and user agent for better identification
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';
  return ip;
}

function checkRateLimit(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    const keysToDelete: string[] = [];
    rateLimitMap.forEach((value, key) => {
      if (value.resetTime < now) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => rateLimitMap.delete(key));
  }

  if (!record || record.resetTime < now) {
    // Create new record or reset expired one
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply stricter rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const key = `api:${getRateLimitKey(request)}`;
    
    if (!checkRateLimit(key, API_RATE_LIMIT)) {
      return NextResponse.json(
        { 
          error: 'Too many requests',
          message: 'Please slow down and try again later.'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': API_RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }
  }

  // General rate limiting for all routes
  const key = getRateLimitKey(request);
  
  if (!checkRateLimit(key, MAX_REQUESTS_PER_WINDOW)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
