import { NextRequest, NextResponse } from 'next/server';

export function middleware(_request: NextRequest) {
  // Client-side auth handling via localStorage is sufficient
  // All routes are accessible; client-side redirects handle auth
  // Protected pages check localStorage directly
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
