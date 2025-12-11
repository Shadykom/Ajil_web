'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface AnimatedIconProps {
  size?: number | string
  className?: string
  animate?: boolean
  delay?: number
}

// ============================================
// ANIMATION VARIANTS
// ============================================

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: 'easeInOut', delay },
      opacity: { duration: 0.3, delay },
    },
  }),
}

const scaleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay,
    },
  }),
}

// ============================================
// ANIMATED AJIL SYMBOL
// ============================================
export function AnimatedAjilSymbol({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M3 5L12 19L21 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M7 7L12 15L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
        variants={drawVariants}
        custom={delay + 0.3}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED CAR FINANCING
// ============================================
export function AnimatedCarFinancing({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M3 14h18v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M5 14l2-5h10l2 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M9 6l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.circle
        cx="7"
        cy="17"
        r="1.5"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.5}
      />
      <motion.circle
        cx="17"
        cy="17"
        r="1.5"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.5}
      />
      <motion.path
        d="M19 12h1M4 12h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED PERSONAL FINANCING
// ============================================
export function AnimatedPersonalFinancing({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.circle
        cx="12"
        cy="7"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay}
      />
      <motion.path
        d="M5 21v-2a7 7 0 0114 0v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M9 14l3 2.5 3-2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M18 4l1 1M20 6h-1M19 8l-1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED BUSINESS FINANCING
// ============================================
export function AnimatedBusinessFinancing({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M3 21h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M5 21V9l7-5 7 5v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M8 7l4-3 4 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.rect
        x="8" y="12" width="3" height="3" rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.5}
      />
      <motion.rect
        x="13" y="12" width="3" height="3" rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.6}
      />
      <motion.path
        d="M10 21v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.7}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED LOAN CALCULATOR
// ============================================
export function AnimatedLoanCalculator({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.rect
        x="4" y="2" width="16" height="20" rx="2"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      <motion.rect
        x="6" y="4" width="12" height="5" rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M9 5.5l3 2.5 3-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.circle cx="8" cy="12" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.5} />
      <motion.circle cx="12" cy="12" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.55} />
      <motion.circle cx="16" cy="12" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.6} />
      <motion.circle cx="8" cy="15" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.65} />
      <motion.circle cx="12" cy="15" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.7} />
      <motion.circle cx="16" cy="15" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.75} />
      <motion.circle cx="8" cy="18" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.8} />
      <motion.circle cx="12" cy="18" r="1" fill="currentColor" variants={scaleVariants} custom={delay + 0.85} />
      <motion.rect x="15" y="17" width="2" height="2" rx="0.5" fill="currentColor" variants={scaleVariants} custom={delay + 0.9} />
    </motion.svg>
  )
}

// ============================================
// ANIMATED SECURITY
// ============================================
export function AnimatedSecurity({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED QUICK APPROVAL
// ============================================
export function AnimatedQuickApproval({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M8 14l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED FLEXIBLE PAYMENTS
// ============================================
export function AnimatedFlexiblePayments({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M21 12a9 9 0 11-6.219-8.56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M21 3v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M9 11l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED SHARIA COMPLIANT
// ============================================
export function AnimatedShariaCompliant({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M12 2c-3 3-6 6-6 10v8h12v-8c0-4-3-7-6-10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M12 4a4 4 0 003 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M9 20v-4l3-2 3 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      <motion.path
        d="M4 20v-6M20 20v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
        variants={drawVariants}
        custom={delay + 0.7}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED 24/7 SERVICE
// ============================================
export function AnimatedService247({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.circle
        cx="8"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay}
      />
      <motion.path
        d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.5 1.5M11 4l-1.5 1.5M4 12l1.5-1.5M11 12l-1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M18 14a4 4 0 11-3 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M10 15l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      <motion.circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.5" variants={scaleVariants} custom={delay + 0.6} />
      <motion.circle cx="17" cy="12" r="0.75" fill="currentColor" opacity="0.4" variants={scaleVariants} custom={delay + 0.7} />
    </motion.svg>
  )
}

// ============================================
// ANIMATED CUSTOMER SUPPORT
// ============================================
export function AnimatedCustomerSupport({ 
  size = 24, 
  className = '', 
  animate = true,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      initial="hidden"
      animate={isInView && animate ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M4 15V11a8 8 0 0116 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.rect
        x="2" y="13" width="4" height="6" rx="2"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay + 0.2}
      />
      <motion.rect
        x="18" y="13" width="4" height="6" rx="2"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M18 19v1a2 2 0 01-2 2h-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M9 9l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED LOADING SPINNER
// ============================================
export function AnimatedLoadingSpinner({ 
  size = 24, 
  className = '',
}: AnimatedIconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
      <path
        d="M12 2a10 10 0 018.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 10l3 4 3-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

// Export all animated icons
export const AnimatedIcons = {
  AjilSymbol: AnimatedAjilSymbol,
  CarFinancing: AnimatedCarFinancing,
  PersonalFinancing: AnimatedPersonalFinancing,
  BusinessFinancing: AnimatedBusinessFinancing,
  LoanCalculator: AnimatedLoanCalculator,
  Security: AnimatedSecurity,
  QuickApproval: AnimatedQuickApproval,
  FlexiblePayments: AnimatedFlexiblePayments,
  ShariaCompliant: AnimatedShariaCompliant,
  Service247: AnimatedService247,
  CustomerSupport: AnimatedCustomerSupport,
  LoadingSpinner: AnimatedLoadingSpinner,
}

export default AnimatedIcons
