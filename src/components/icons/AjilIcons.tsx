'use client'

import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * AJIL Finance Custom Icon Set
 * 
 * Design Principles:
 * - Each icon incorporates the signature AJIL "V" motif
 * - Modern, clean lines with consistent 2px stroke weight
 * - Dual-tone design using primary blue and accent elements
 * - Balanced proportions within 24x24 viewBox
 * - Professional finance industry aesthetic
 */

// ============================================
// CORE BRAND ICON - AJIL SYMBOL
// ============================================
export function AjilSymbol({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Main V with gradient effect simulation */}
      <path
        d="M3 5L12 19L21 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner accent V */}
      <path
        d="M7 7L12 15L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  )
}

// ============================================
// CAR FINANCING - Premium Vehicle Icon
// ============================================
export function IconCarFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Car body - sleek design */}
      <path
        d="M3 14h18v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Car roof with AJIL V integration */}
      <path
        d="M5 14l2-5h10l2 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V on hood - brand signature */}
      <path
        d="M9 6l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
      {/* Headlight accent */}
      <path
        d="M19 12h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ============================================
// PERSONAL FINANCING - Trust & Growth Icon
// ============================================
export function IconPersonalFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Person silhouette */}
      <circle
        cx="12"
        cy="7"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Body arc */}
      <path
        d="M5 21v-2a7 7 0 0114 0v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* AJIL V badge on chest - trust symbol */}
      <path
        d="M9 14l3 2.5 3-2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Growth sparkle */}
      <path
        d="M18 4l1 1M20 6h-1M19 8l-1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// BUSINESS FINANCING - Corporate Growth Icon
// ============================================
export function IconBusinessFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Main building */}
      <path
        d="M3 21h18M5 21V9l7-5 7 5v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V as building crown/peak */}
      <path
        d="M8 7l4-3 4 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windows - grid pattern */}
      <rect x="8" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Door */}
      <path
        d="M10 21v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Growth arrow */}
      <path
        d="M18 8l2-2m0 0v2m0-2h-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  )
}

// ============================================
// LOAN PRODUCTS - Premium Card Icon
// ============================================
export function IconLoanProducts({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Card base with premium rounded corners */}
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Magnetic stripe */}
      <path
        d="M2 10h20"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* AJIL V watermark - centered */}
      <path
        d="M8 14l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chip */}
      <rect
        x="5"
        y="7"
        width="4"
        height="2.5"
        rx="0.5"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Card number dots */}
      <circle cx="15" cy="8" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="17" cy="8" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="19" cy="8" r="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// ============================================
// APPLY FINANCING - Document Approval Icon
// ============================================
export function IconApplyFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Document with folded corner */}
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V approval checkmark */}
      <path
        d="M8 14l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Document lines */}
      <path
        d="M8 10h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// LOAN CALCULATOR - Smart Gauge Icon
// ============================================
export function IconLoanCalculator({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Calculator body */}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Display screen */}
      <rect
        x="6"
        y="4"
        width="12"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* AJIL V in display */}
      <path
        d="M9 5.5l3 2.5 3-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Calculator buttons grid */}
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
      <circle cx="8" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      {/* Equals button */}
      <rect x="15" y="17" width="2" height="2" rx="0.5" fill="currentColor" />
    </svg>
  )
}

// ============================================
// MURABAHA - Islamic Finance Icon
// ============================================
export function IconMurabaha({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Handshake base */}
      <path
        d="M20 11c0-1.5-1-2-2-2h-3l-3 3-3-3H6c-1 0-2 .5-2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hands meeting - partnership */}
      <path
        d="M9 15l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V crown - trust symbol */}
      <path
        d="M8 5l4 3 4-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Balance scales hint */}
      <path
        d="M12 8v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Crescent accent - Islamic finance */}
      <path
        d="M18 5a3 3 0 01-2.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// TRACK APPLICATION - Journey Progress Icon
// ============================================
export function IconTrackApplication({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Progress path */}
      <path
        d="M3 12h4l3-9 4 18 3-9h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Location marker at end */}
      <circle
        cx="20"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Start point */}
      <circle
        cx="3"
        cy="12"
        r="1.5"
        fill="currentColor"
      />
      {/* AJIL V milestone marker */}
      <path
        d="M10 19l2-2 2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// CUSTOMER SUPPORT - 24/7 Care Icon
// ============================================
export function IconCustomerSupport({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Headset band */}
      <path
        d="M4 15V11a8 8 0 0116 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left earpiece */}
      <rect
        x="2"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Right earpiece */}
      <rect
        x="18"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Microphone */}
      <path
        d="M18 19v1a2 2 0 01-2 2h-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V - voice/sound waves */}
      <path
        d="M9 9l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// HOME / DASHBOARD Icon
// ============================================
export function IconHome({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* House structure */}
      <path
        d="M3 10l9-7 9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V integrated into roof peak */}
      <path
        d="M8 6l4-3 4 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <path
        d="M9 21v-6h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window */}
      <rect
        x="10"
        y="10"
        width="4"
        height="3"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// ============================================
// SETTINGS - Configuration Icon
// ============================================
export function IconSettings({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Gear outer ring */}
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Gear teeth with AJIL V integration */}
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V center accent */}
      <path
        d="M10 11l2 2 2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// PAYMENTS - Secure Transaction Icon
// ============================================
export function IconPayments({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Wallet body */}
      <rect
        x="2"
        y="6"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Wallet flap */}
      <path
        d="M22 10H18a2 2 0 000 4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Coin slot detail */}
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      {/* AJIL V on wallet */}
      <path
        d="M6 10l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Money bills hint */}
      <path
        d="M2 6l4-2h12l4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// SECURITY - Shield Protection Icon
// ============================================
export function IconSecurity({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Shield shape */}
      <path
        d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V checkmark - verified/secure */}
      <path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lock keyhole accent */}
      <circle
        cx="12"
        cy="9"
        r="1"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}

// ============================================
// QUICK APPROVAL - Fast Process Icon
// ============================================
export function IconQuickApproval({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Clock face */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Clock hands showing speed */}
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AJIL V approval stamp */}
      <path
        d="M8 14l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Speed lines */}
      <path
        d="M2 12h2M20 12h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// FLEXIBLE PAYMENTS - Adaptable Icon
// ============================================
export function IconFlexiblePayments({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Circular arrows - flexibility */}
      <path
        d="M21 12a9 9 0 11-6.219-8.56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Currency symbol with AJIL V */}
      <path
        d="M9 11l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dollar sign accent */}
      <path
        d="M12 8v8M10 10h4M10 14h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// SHARIA COMPLIANT - Islamic Finance Icon
// ============================================
export function IconShariaCompliant({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Mosque dome */}
      <path
        d="M12 2c-3 3-6 6-6 10v8h12v-8c0-4-3-7-6-10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crescent moon */}
      <path
        d="M12 4a4 4 0 003 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* AJIL V doorway arch */}
      <path
        d="M9 20v-4l3-2 3 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Minaret accents */}
      <path
        d="M4 20v-6M20 20v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// 24/7 SERVICE - Always Available Icon
// ============================================
export function IconService247({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Sun/Day */}
      <circle
        cx="8"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Sun rays */}
      <path
        d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.5 1.5M11 4l-1.5 1.5M4 12l1.5-1.5M11 12l-1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Moon/Night */}
      <path
        d="M18 14a4 4 0 11-3 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* AJIL V connection */}
      <path
        d="M10 15l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stars */}
      <circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="17" cy="12" r="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// ============================================
// OFFERS / PROMOTIONS Icon
// ============================================
export function IconOffers({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Gift box */}
      <rect
        x="3"
        y="10"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Ribbon vertical */}
      <path
        d="M12 10v11"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Ribbon horizontal */}
      <path
        d="M3 14h18"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Bow - AJIL V shape */}
      <path
        d="M12 10c-2 0-4-2-4-4s2-3 4-3M12 10c2 0 4-2 4-4s-2-3-4-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sparkle */}
      <path
        d="M18 4l1-1M20 6l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================
// ABOUT / INFO Icon
// ============================================
export function IconAbout({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Circle background */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Info "i" dot */}
      <circle
        cx="12"
        cy="8"
        r="1"
        fill="currentColor"
      />
      {/* Info "i" line */}
      <path
        d="M12 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* AJIL V accent at bottom */}
      <path
        d="M9 15l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  )
}

// ============================================
// NEWS / UPDATES Icon
// ============================================
export function IconNews({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      {/* Newspaper */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Headline - AJIL V */}
      <path
        d="M7 7l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Text lines */}
      <path
        d="M7 13h10M7 16h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Image placeholder */}
      <rect
        x="15"
        y="6"
        width="3"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  )
}

// Export all icons
export const AjilIcons = {
  AjilSymbol,
  IconCarFinancing,
  IconPersonalFinancing,
  IconBusinessFinancing,
  IconLoanProducts,
  IconApplyFinancing,
  IconLoanCalculator,
  IconMurabaha,
  IconTrackApplication,
  IconCustomerSupport,
  IconHome,
  IconSettings,
  IconPayments,
  IconSecurity,
  IconQuickApproval,
  IconFlexiblePayments,
  IconShariaCompliant,
  IconService247,
  IconOffers,
  IconAbout,
  IconNews,
}

export default AjilIcons
