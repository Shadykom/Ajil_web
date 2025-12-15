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
    lower === '/confirmation.html' ||
    lower === '/confirm.html' ||
    lower === '/verify.html' ||
    lower === '/verification.html'
      ? '/confirmation'
      : lower

  // Handle legacy/printed QR paths like "/verify/..." or "/verification/...".
  const normalized2 =
    normalized.startsWith('/verify') || normalized.startsWith('/verification')
      ? normalized.replace(/^\/verification/, '/confirmation').replace(/^\/verify/, '/confirmation')
      : normalized

  if (pathname !== normalized2) {
    const url = request.nextUrl.clone()
    url.pathname = normalized2
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next).*)'],
}

