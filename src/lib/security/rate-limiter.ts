/**
 * AJIL Rate Limiter & Security Utilities
 * SAMA & NCA Compliance Ready
 */

// Rate limit configuration
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string;
}

// Default rate limit configs for different endpoints
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  // API endpoints
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    keyPrefix: 'api',
  },
  // Form submissions
  form: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    keyPrefix: 'form',
  },
  // Login attempts
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    keyPrefix: 'auth',
  },
  // Calculator usage
  calculator: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    keyPrefix: 'calc',
  },
  // Newsletter subscription
  newsletter: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    keyPrefix: 'news',
  },
  // Contact form
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    keyPrefix: 'contact',
  },
};

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Check rate limit
export function checkRateLimit(
  identifier: string,
  configKey: keyof typeof rateLimitConfigs = 'api'
): { allowed: boolean; remaining: number; resetIn: number } {
  const config = rateLimitConfigs[configKey];
  const key = `${config.keyPrefix}:${identifier}`;
  const now = Date.now();

  // Get or create entry
  let entry = rateLimitStore.get(key);

  // Reset if window expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  // Check if rate limited
  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);
  const resetIn = Math.max(0, entry.resetTime - now);

  return { allowed, remaining, resetIn };
}

// Rate limit middleware for API routes
export function rateLimitMiddleware(
  configKey: keyof typeof rateLimitConfigs = 'api'
) {
  return async (
    request: Request,
    getIdentifier: (req: Request) => string = (req) => {
      // Get client IP from headers (handles proxies)
      const forwardedFor = req.headers.get('x-forwarded-for');
      const realIp = req.headers.get('x-real-ip');
      return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
    }
  ): Promise<{ success: boolean; response?: Response }> => {
    const identifier = getIdentifier(request);
    const { allowed, remaining, resetIn } = checkRateLimit(identifier, configKey);

    if (!allowed) {
      return {
        success: false,
        response: new Response(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil(resetIn / 1000),
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(Math.ceil(resetIn / 1000)),
              'X-RateLimit-Limit': String(rateLimitConfigs[configKey].maxRequests),
              'X-RateLimit-Remaining': String(remaining),
              'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000)),
            },
          }
        ),
      };
    }

    return { success: true };
  };
}

// ============================================
// RECAPTCHA VERIFICATION
// ============================================

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  challengeTs?: string;
  hostname?: string;
  errorCodes?: string[];
}

// Verify reCAPTCHA token (server-side)
export async function verifyRecaptcha(
  token: string,
  secretKey: string,
  expectedAction?: string,
  minScore: number = 0.5
): Promise<RecaptchaVerifyResult> {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json();

    // For reCAPTCHA v3, check score
    if (data.success && data.score !== undefined) {
      if (data.score < minScore) {
        return {
          success: false,
          score: data.score,
          errorCodes: ['LOW_SCORE'],
        };
      }

      // Verify action if expected
      if (expectedAction && data.action !== expectedAction) {
        return {
          success: false,
          action: data.action,
          errorCodes: ['ACTION_MISMATCH'],
        };
      }
    }

    return {
      success: data.success,
      score: data.score,
      action: data.action,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return {
      success: false,
      errorCodes: ['VERIFICATION_FAILED'],
    };
  }
}

// ============================================
// INPUT SANITIZATION
// ============================================

// Sanitize string input
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Escape special characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize phone number (Saudi format)
export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Convert to standard format
  if (cleaned.startsWith('+966')) {
    return cleaned;
  } else if (cleaned.startsWith('00966')) {
    return '+966' + cleaned.substring(5);
  } else if (cleaned.startsWith('966')) {
    return '+966' + cleaned.substring(3);
  } else if (cleaned.startsWith('05') || cleaned.startsWith('5')) {
    const number = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;
    return '+966' + number;
  }
  
  return cleaned;
}

// Sanitize email
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Sanitize national ID
export function sanitizeNationalId(id: string): string {
  return id.replace(/[^\d]/g, '');
}

// ============================================
// CSRF PROTECTION
// ============================================

// Generate CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Verify CSRF token
export function verifyCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  if (token.length !== storedToken.length) return false;
  
  // Constant-time comparison
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  return result === 0;
}

// ============================================
// AUDIT LOGGING
// ============================================

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  userId?: string;
  resourceType: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  outcome: 'success' | 'failure';
  reason?: string;
}

// Log audit event (would write to database/logging service in production)
export function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  const auditLog: AuditLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // In production, this would:
  // 1. Write to audit log database
  // 2. Send to SIEM for security monitoring
  // 3. Store for compliance (7 years per SAMA requirements)
  
  console.log('[AUDIT]', JSON.stringify(auditLog));
}

// Predefined audit actions
export const auditActions = {
  // Authentication
  LOGIN_SUCCESS: 'user.login.success',
  LOGIN_FAILURE: 'user.login.failure',
  LOGOUT: 'user.logout',
  PASSWORD_RESET: 'user.password_reset',
  
  // Form submissions
  FORM_SUBMIT: 'form.submit',
  APPLICATION_SUBMIT: 'application.submit',
  CONTACT_SUBMIT: 'contact.submit',
  COMPLAINT_SUBMIT: 'complaint.submit',
  
  // Data access
  DATA_VIEW: 'data.view',
  DATA_EXPORT: 'data.export',
  DATA_DELETE: 'data.delete',
  
  // Content management
  CONTENT_CREATE: 'content.create',
  CONTENT_UPDATE: 'content.update',
  CONTENT_PUBLISH: 'content.publish',
  CONTENT_DELETE: 'content.delete',
  
  // Security events
  RATE_LIMIT_EXCEEDED: 'security.rate_limit',
  INVALID_TOKEN: 'security.invalid_token',
  SUSPICIOUS_ACTIVITY: 'security.suspicious',
};

// ============================================
// SECURITY HEADERS
// ============================================

// Get security headers for responses
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    // XSS protection
    'X-XSS-Protection': '1; mode=block',
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://api.ajil.com",
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
    ].join('; '),
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=(self)',
      'payment=(self)',
    ].join(', '),
    // HSTS (only in production)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  };
}
