import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

const protectedRoutes = ['/home', '/'];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Skip session checks for sign-in and sign-up pages
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return NextResponse.next();
  }

  // If user is authenticated and trying to access the sign-in or sign-up page, redirect to home
  if (session && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not authenticated and trying to access a protected route, redirect to sign-in
  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
