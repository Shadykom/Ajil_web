import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format currency in SAR (Saudi Riyal)
 */
export function formatCurrency(
  amount: number,
  locale: 'ar-SA' | 'en-SA' = 'ar-SA',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

/**
 * Format number with locale support
 */
export function formatNumber(
  num: number,
  locale: 'ar-SA' | 'en-SA' = 'ar-SA',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(
  value: number,
  locale: 'ar-SA' | 'en-SA' = 'ar-SA',
  decimals: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format date with Hijri/Gregorian support
 */
export function formatDate(
  date: Date | string,
  locale: 'ar-SA' | 'en-SA' = 'ar-SA',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * Format Hijri date
 */
export function formatHijriDate(
  date: Date | string,
  locale: 'ar-SA' | 'en-SA' = 'ar-SA'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(`${locale}-u-ca-islamic`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'ajil'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate reference number for inquiries/applications
 */
export function generateReferenceNumber(type: 'APP' | 'INQ' | 'CMP' = 'APP'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${type}-${timestamp}-${random}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Validate Saudi National ID (Iqama/Saudi ID)
 */
export function validateSaudiNationalId(id: string): boolean {
  // Must be 10 digits
  if (!/^\d{10}$/.test(id)) return false;
  
  // First digit: 1 for Saudi, 2 for Iqama
  const firstDigit = id.charAt(0);
  if (firstDigit !== '1' && firstDigit !== '2') return false;
  
  // Luhn algorithm validation
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let digit = parseInt(id.charAt(i), 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  
  return sum % 10 === 0;
}

/**
 * Validate Saudi phone number
 */
export function validateSaudiPhone(phone: string): boolean {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Valid formats: 05XXXXXXXX, +9665XXXXXXXX, 009665XXXXXXXX
  const patterns = [
    /^05\d{8}$/, // Local format
    /^\+9665\d{8}$/, // International with +
    /^009665\d{8}$/, // International with 00
    /^9665\d{8}$/, // Without prefix
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Mask sensitive data for display
 */
export function maskData(data: string, type: 'phone' | 'email' | 'id'): string {
  switch (type) {
    case 'phone':
      // Show last 4 digits: ******1234
      return data.slice(0, -4).replace(/./g, '*') + data.slice(-4);
    case 'email':
      // Show first 2 chars and domain: ab****@domain.com
      const [local, domain] = data.split('@');
      return local.slice(0, 2) + '****@' + domain;
    case 'id':
      // Show first 2 and last 2: 10******12
      return data.slice(0, 2) + '******' + data.slice(-2);
    default:
      return data;
  }
}

/**
 * Scroll to element with offset for sticky header
 */
export function scrollToElement(
  elementId: string,
  offset: number = 100
): void {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Check if user is on mobile device
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get direction from locale
 */
export function getDirection(locale: string): 'rtl' | 'ltr' {
  return locale.startsWith('ar') ? 'rtl' : 'ltr';
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Get contrast color (black or white) for given background
 */
export function getContrastColor(hexColor: string): 'black' | 'white' {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? 'black' : 'white';
}
