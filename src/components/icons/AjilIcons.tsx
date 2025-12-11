'use client'

import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

// Base Ajil Symbol
export function AjilSymbol({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path
        d="M4 6L12 18L20 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 1. Loan Products - Card + Ajil V inside
export function IconLoanProducts({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Card */}
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil V */}
      <path
        d="M8 9L12 15L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 2. Apply for Financing - Document + Ajil V as approval mark + pen
export function IconApplyFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Document */}
      <path
        d="M7 4H15L19 8V20H7V4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil V check */}
      <path
        d="M9 11L11 14L14 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pen (simple) */}
      <path
        d="M14.5 16.5L18 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14.2" cy="16.8" r="0.8" fill="currentColor" />
    </svg>
  )
}

// 3. Loan Calculator - Circular gauge + Ajil V as pointer
export function IconLoanCalculator({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Outer gauge */}
      <path
        d="M5 15A7 7 0 0 1 19 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center dot */}
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      {/* Ajil V pointer (small) */}
      <path
        d="M10 9L12 12L14 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* % sign (hint) */}
      <path
        d="M8 18L16 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="18" r="0.8" fill="currentColor" />
      <circle cx="16" cy="10" r="0.8" fill="currentColor" />
    </svg>
  )
}

// 4. Business Financing - Buildings + Ajil V as growth arrow
export function IconBusinessFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Small building */}
      <rect
        x="4"
        y="11"
        width="4"
        height="7"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tall building */}
      <rect
        x="10"
        y="8"
        width="4"
        height="10"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right building */}
      <rect
        x="16"
        y="10"
        width="4"
        height="8"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil growth arrow on top */}
      <path
        d="M8 6L12 4L16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 5. Personal Financing - Human + Ajil V as support base
export function IconPersonalFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Head */}
      <circle
        cx="12"
        cy="7"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body circle */}
      <path
        d="M7 17C7 13.7 9.2 12 12 12C14.8 12 17 13.7 17 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil base */}
      <path
        d="M6 19L12 21L18 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 6. Murabaha Products - Two interlocking tiles + Ajil V at joint
export function IconMurabaha({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Left tile */}
      <rect
        x="5"
        y="7"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right tile overlapping */}
      <rect
        x="12"
        y="10"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil joint */}
      <path
        d="M9 10L12 13L15 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 7. Track Application - Progress path + locator + Ajil V arrow
export function IconTrackApplication({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Dotted path (simplified) */}
      <path
        d="M5 18C5 14 8 12 12 12C16 12 19 10 19 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Destination marker */}
      <circle
        cx="19"
        cy="6"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Ajil arrow */}
      <path
        d="M8 9L12 7L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 8. Customer Support - Headset + Ajil V spark
export function IconCustomerSupport({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Head band */}
      <path
        d="M7 10C7 7.8 8.8 6 11 6H13C15.2 6 17 7.8 17 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left earpad */}
      <rect
        x="4"
        y="10"
        width="3"
        height="5"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right earpad */}
      <rect
        x="17"
        y="10"
        width="3"
        height="5"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mic */}
      <path
        d="M18 17C18 18.7 16.7 20 15 20H13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil spark */}
      <path
        d="M9 18L12 20L15 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 9. Home / Dashboard
export function IconHome({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* House */}
      <path
        d="M4 11L12 5L20 11V19H8V14H4V11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil detail in roof */}
      <path
        d="M9 10L12 8L15 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 10. Settings
export function IconSettings({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Gear (simplified) */}
      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M12 4V6.5M12 17.5V20M5.5 8L7.3 9.3M16.7 14.7L18.5 16M5.5 16L7.3 14.7M16.7 9.3L18.5 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Small Ajil V hint inside */}
      <path
        d="M11 11L12 12.5L13 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 11. Payments
export function IconPayments({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Card */}
      <rect
        x="4"
        y="7"
        width="16"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="6"
        y1="11"
        x2="18"
        y2="11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Ajil coin / logo */}
      <circle
        cx="16"
        cy="15"
        r="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.0"
      />
      <path
        d="M15 14.3L16 15.7L17 14.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 12. Security / Shield
export function IconSecurity({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Shield */}
      <path
        d="M12 4L7 6V11C7 14.5 9 17.5 12 19C15 17.5 17 14.5 17 11V6L12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil check */}
      <path
        d="M9.5 11.5L11.5 13.5L14.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Car Financing Icon (custom for car service)
export function IconCarFinancing({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Car body */}
      <path
        d="M5 15V16.5C5 17.3 5.7 18 6.5 18H7.5C8.3 18 9 17.3 9 16.5V16H15V16.5C15 17.3 15.7 18 16.5 18H17.5C18.3 18 19 17.3 19 16.5V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 15H5C4 15 3 14 3 13V12C3 11 4 10 5 10H19C20 10 21 11 21 12V13C21 14 20 15 19 15Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windows / roof with Ajil V */}
      <path
        d="M7 10L9 7H15L17 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ajil V on car */}
      <path
        d="M10 6L12 4L14 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Export all icons
export const AjilIcons = {
  AjilSymbol,
  IconLoanProducts,
  IconApplyFinancing,
  IconLoanCalculator,
  IconBusinessFinancing,
  IconPersonalFinancing,
  IconMurabaha,
  IconTrackApplication,
  IconCustomerSupport,
  IconHome,
  IconSettings,
  IconPayments,
  IconSecurity,
  IconCarFinancing,
}

export default AjilIcons
