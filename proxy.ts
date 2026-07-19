import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = [
  'ru', 'uk', 'es', 'pt', 'id', 'tl', 'ko', 'ja', 'zh', 'fi', 'sv', 'no', 'da', 'de',
  'pl', 'ro', 'it', 'fr', 'th', 'vi', 'ar', 'tr', 'hi', 'nl', 'el', 'ms', 'hu', 'cs'
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (locales.includes(firstSegment)) {
    const newPathname = '/' + segments.slice(2).join('/');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    
    const response = NextResponse.rewrite(url);
    response.headers.set('x-locale', firstSegment);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|ads.txt|google9b159676f48eb600.html|placeholder.html|.*\\.png|.*\\.webp|.*\\.jfif|.*\\.avif|.*\\.jpeg|.*\\.svg|.*\\.txt).*)',
  ],
};
