import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const EXCLUDED_PREFIXES = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/apple-icon',
  '/icon',
  '/images',
  '/fonts',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const lower = pathname.toLowerCase()

  // Handle legacy/printed QR URLs that end with ".html".
  const normalized =
    lower === '/confirmation.html' || lower === '/confirm.html' ? '/confirmation' : lower

  if (pathname !== normalized) {
    const url = request.nextUrl.clone()
    url.pathname = normalized
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next).*)'],
}

