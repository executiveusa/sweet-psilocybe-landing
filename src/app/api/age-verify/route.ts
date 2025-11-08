import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AGE_VERIFICATION_COOKIE = 'age_verified';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const isVerified = cookieStore.get(AGE_VERIFICATION_COOKIE)?.value === 'true';
  
  return NextResponse.json({ verified: isVerified });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate } = body;

    if (!birthDate) {
      return NextResponse.json(
        { error: 'Birth date is required' },
        { status: 400 }
      );
    }

    // Calculate age
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // Validate age (must be 18+)
    if (age < 18) {
      return NextResponse.json(
        { 
          verified: false, 
          error: 'You must be 18 or older to access this site' 
        },
        { status: 403 }
      );
    }

    // Set secure HTTP-only cookie
    const response = NextResponse.json({ 
      verified: true,
      message: 'Age verified successfully' 
    });

    response.cookies.set({
      name: AGE_VERIFICATION_COOKIE,
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Age verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
