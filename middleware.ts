import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const session = await getSession();
    if (!session || !session.admin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Exclude auth routes or static files from further processing if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
