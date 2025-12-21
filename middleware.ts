import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * AJIL Finance Middleware
 * - Arabic-first routing (/ar default, /en secondary)
 * - RTL/LTR switching
 * - Security headers
 * - Legacy URL handling
 */

// Supported languages
const SUPPORTED_LANGUAGES = ['ar', 'en'] as const
const DEFAULT_LANGUAGE = 'ar'

// Excluded prefixes (static assets, API routes, etc.)
const EXCLUDED_PREFIXES = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap',
  '/apple-icon',
  '/icon',
  '/images',
  '/fonts',
  '/public',
]

// Security headers
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip excluded paths
  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Handle legacy/printed QR URLs that end with ".html"
  const lower = pathname.toLowerCase()
  const normalized =
    lower === '/confirmation.html' || lower === '/confirm.html' ? '/confirmation' : lower

  if (pathname !== normalized) {
    const url = request.nextUrl.clone()
    url.pathname = normalized
    return NextResponse.redirect(url, 308)
  }

  // Extract the first path segment to check for language
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  // Check if path already has a supported language prefix
  const hasLanguagePrefix = SUPPORTED_LANGUAGES.includes(firstSegment as any)

  // If no language prefix, redirect to Arabic (default)
  if (!hasLanguagePrefix && pathname !== '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LANGUAGE}${pathname}`
    return NextResponse.redirect(url, 308)
  }

  // Handle root path - redirect to Arabic
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LANGUAGE}`
    return NextResponse.redirect(url, 308)
  }

  // Get preferred language from cookie or Accept-Language header
  const savedLanguage = request.cookies.get('language')?.value
  const acceptLanguage = request.headers.get('Accept-Language')
  
  // Determine preferred language
  let preferredLanguage = savedLanguage
  if (!preferredLanguage && acceptLanguage) {
    preferredLanguage = acceptLanguage.startsWith('ar') ? 'ar' : 
                       acceptLanguage.startsWith('en') ? 'en' : DEFAULT_LANGUAGE
  }

  // Create response with security headers
  const response = NextResponse.next()

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Set language cookie if not set
  if (!savedLanguage && hasLanguagePrefix) {
    response.cookies.set('language', firstSegment, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

