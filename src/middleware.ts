import { i18nRouter } from 'next-i18n-router';
import type { NextRequest, NextResponse } from 'next/server';
import i18nConfig from '../i18n.config';

const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const res = i18nRouter(request, i18nConfig);
  return res;
};

// applies this middleware only to files in the app directory
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};

export default middleware;
