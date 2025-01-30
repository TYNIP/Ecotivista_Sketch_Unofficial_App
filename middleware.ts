import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
const { PATHURL } = require('./pages/api/config');

export async function middleware(req: NextRequest) {

  
  try {
    const token = req.cookies.get('auth_cookie');
    if (!token) {
      return NextResponse.redirect(new URL('/forums', req.url));
    }

    // Extract User-Agent
    const userAgent = req.headers.get('user-agent') || '';

    // Extract ip's client + server
    let ipAddress = req.headers.get('x-forwarded-for')|| req.ip || '';

    // Send token and correct client IP to auth check
    const res = await fetch(`${PATHURL}/api/auth/check`, {
      headers: {
        token: token.value,
        agent: userAgent,
        ip: ipAddress, 
      },
    });

    const data = await res.json();

    if (!data.isAuthorized) {
      return NextResponse.redirect(new URL('/events', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Middleware error:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/info/:path*', '/api/authen/:path*'],
};
