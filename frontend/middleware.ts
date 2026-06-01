import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public auth routes and Next.js internals through unconditionally.
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // For protected routes, require a token cookie or Authorization header.
  // Note: localStorage is not accessible in middleware (server-side).
  // The app stores the token only in localStorage, so we cannot fully enforce
  // this here. The client-side layout auth check (dashboard/layout.tsx) does
  // a live server verification. This layer catches the trivial case where no
  // token cookie is present at all.
  //
  // To strengthen this to true server-side enforcement, the login flow should
  // also set an httpOnly cookie (see storage.ts setToken recommendation).
  const tokenCookie = request.cookies.get('token')?.value;
  const authHeader = request.headers.get('authorization');

  const isDashboardRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/admin');

  if (isDashboardRoute && !tokenCookie && !authHeader) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
