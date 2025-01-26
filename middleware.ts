import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
const { PATHURL } = require('./pages/api/config');

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_cookie');

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Extract User-Agent and IP address from the incoming request
    const userAgent = req.headers.get('user-agent') || '';
    const ipAddress = req.headers.get('x-forwarded-for') || req.ip || ''; // Fallback to req.ip if necessary

    // Make sure the headers are passed to the check endpoint
    const res = await fetch(`${PATHURL}/api/auth/check`, {
      headers: {
        token: token.value,
        'User-Agent': userAgent,
        'x-forwarded-for': ipAddress,
      },
    });

    const data = await res.json();

    if (!data.isAuthorized) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('err', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/info/:path*', '/api/authen/:path*'],
};
