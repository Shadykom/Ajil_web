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
// ANIMATED OFFERS - Gift/Special Deals Icon
// ============================================
export function AnimatedOffers({ 
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
      {/* Gift box */}
      <motion.rect
        x="3"
        y="10"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      {/* Ribbon vertical */}
      <motion.path
        d="M12 10v11"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Ribbon horizontal */}
      <motion.path
        d="M3 14h18"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      {/* Bow - AJIL V shape */}
      <motion.path
        d="M12 10c-2 0-4-2-4-4s2-3 4-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M12 10c2 0 4-2 4-4s-2-3-4-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      {/* Sparkle */}
      <motion.path
        d="M18 4l1-1M20 6l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED ABOUT - Info/Company Icon
// ============================================
export function AnimatedAbout({ 
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
      {/* Circle background */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      {/* Info "i" dot */}
      <motion.circle
        cx="12"
        cy="8"
        r="1"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.3}
      />
      {/* Info "i" line */}
      <motion.path
        d="M12 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      {/* AJIL V accent at bottom */}
      <motion.path
        d="M9 15l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED NEWS - Newspaper Icon
// ============================================
export function AnimatedNews({ 
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
      {/* Newspaper frame */}
      <motion.rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      {/* Headline - AJIL V */}
      <motion.path
        d="M7 7l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      {/* Text lines */}
      <motion.path
        d="M7 13h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M7 16h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      {/* Image placeholder */}
      <motion.rect
        x="15"
        y="6"
        width="3"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
        variants={scaleVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED REFRESH
// ============================================
export function AnimatedRefresh({ 
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
      {/* Top refresh arrow */}
      <motion.path
        d="M6 7.5A6 6 0 0117.25 7.5L18.75 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M17.25 7.5H20.625"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Bottom refresh arrow */}
      <motion.path
        d="M18 16.5A6 6 0 016.75 16.5L5.25 18.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M6.75 16.5H3.375"
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
// ANIMATED TERMS & CONDITIONS
// ============================================
export function AnimatedTerms({ 
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
      {/* Paper */}
      <motion.path
        d="M8.25 3.75H14.25L17.25 6.75V18.75H8.25V3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M14.25 3.75V6.75H17.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Text lines */}
      <motion.path
        d="M9.75 9H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M9.75 11.25H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M9.75 13.5H12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      {/* Chatbot badge */}
      <motion.circle
        cx="16.5"
        cy="16.5"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.6}
      />
      <motion.path
        d="M15.375 16.125C15.375 15.5 15.75 15.2 16.5 15.2C17.25 15.2 17.625 15.5 17.625 16.125C17.625 16.5 17.44 16.7 16.94 16.88L16.5 17V17.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.7}
      />
      <motion.circle
        cx="16.5"
        cy="18"
        r="0.3"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.8}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED FAQ
// ============================================
export function AnimatedFaq({ 
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
      {/* Speech bubble */}
      <motion.path
        d="M6.75 6.75C6.75 5.1 8.25 3.75 10.3 3.75H13.7C15.75 3.75 17.25 5.1 17.25 6.75V9.75C17.25 11.4 15.75 12.75 13.7 12.75H11.25L9 15V12.75H10.3C8.25 12.75 6.75 11.4 6.75 9.75V6.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Question mark */}
      <motion.path
        d="M11.625 6.75C11.8 6.2 12.25 5.85 12.9 5.85C13.65 5.85 14.25 6.4 14.25 7.125C14.25 7.6 14 7.95 13.5 8.2C13.1 8.35 12.9 8.55 12.9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.circle
        cx="12.9"
        cy="10.3"
        r="0.5"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED BANK TRANSFER
// ============================================
export function AnimatedBankTransfer({ 
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
      {/* Bank roof */}
      <motion.path
        d="M6 8.25L12 4.5L18 8.25H6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Columns */}
      <motion.path
        d="M7.5 8.25V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.15}
      />
      <motion.path
        d="M10.5 8.25V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M13.5 8.25V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.25}
      />
      <motion.path
        d="M16.5 8.25V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      {/* Base */}
      <motion.path
        d="M6 13.5H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      {/* Transfer arrows */}
      <motion.path
        d="M7.5 15V18M7.5 18L6 16.5M7.5 18L9 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      <motion.path
        d="M16.5 15V18M16.5 15L15 16.5M16.5 15L18 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED CARD PAYMENT
// ============================================
export function AnimatedCardPayment({ 
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
      {/* Back card */}
      <motion.rect
        x="6"
        y="8.25"
        width="12"
        height="6.75"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M6 10.5H18"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Front card */}
      <motion.rect
        x="8.25"
        y="6.75"
        width="12"
        height="6.75"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M10.5 9H18"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.5}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED EDIT COINS
// ============================================
export function AnimatedEditCoins({ 
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
      {/* Left stack */}
      <motion.ellipse
        cx="9"
        cy="12"
        rx="2.25"
        ry="1.125"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M6.75 12V15C6.75 15.6 7.75 16.125 9 16.125C10.25 16.125 11.25 15.6 11.25 15V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.ellipse
        cx="9"
        cy="13.5"
        rx="2.25"
        ry="1.125"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      {/* Right stack */}
      <motion.ellipse
        cx="15"
        cy="10.5"
        rx="2.25"
        ry="1.125"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay + 0.35}
      />
      <motion.path
        d="M12.75 10.5V13.5C12.75 14.1 13.75 14.625 15 14.625C16.25 14.625 17.25 14.1 17.25 13.5V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      <motion.ellipse
        cx="15"
        cy="12"
        rx="2.25"
        ry="1.125"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED ANALYTICS
// ============================================
export function AnimatedAnalytics({ 
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
      {/* Frame */}
      <motion.rect
        x="5.25"
        y="5.25"
        width="13.5"
        height="13.5"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      {/* Bar chart */}
      <motion.path
        d="M7.5 15V12.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M10.5 15V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M13.5 15V8.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M16.5 15V11.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      {/* Trend line */}
      <motion.path
        d="M7.5 11.25L10.5 9.75L13.5 7.5L16.5 9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED LOGOUT (Cloud Download)
// ============================================
export function AnimatedLogout({ 
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
      {/* Cloud */}
      <motion.path
        d="M8.25 15C6.375 15 4.875 13.6 4.875 11.8C4.875 10 6 8.7 7.95 8.65C8.4 6.85 9.95 5.625 11.8 5.625C13.8 5.625 15.4 7.05 15.65 8.96C16.95 9.2 18 10.4 18 11.8C18 13.6 16.5 15 14.625 15H8.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Download arrow */}
      <motion.path
        d="M12 10.5V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M10.5 13.5L12 15L13.5 13.5"
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
// ANIMATED DELETE (Trash)
// ============================================
export function AnimatedDelete({ 
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
      {/* Trash can body */}
      <motion.path
        d="M8.25 8.25L9 18.75H15L15.75 8.25H8.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Lid */}
      <motion.path
        d="M7.5 8.25H16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Handle */}
      <motion.path
        d="M10.5 6.75H13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      {/* Lines inside */}
      <motion.path
        d="M11.25 10.125V16.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      <motion.path
        d="M12.75 10.125V16.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED FOLDER
// ============================================
export function AnimatedFolder({ 
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
      {/* Folder shape */}
      <motion.path
        d="M5.25 8.25H9.75L11.25 6.75H18.75C19.6 6.75 20.25 7.4 20.25 8.25V16.5C20.25 17.35 19.6 18 18.75 18H5.25C4.4 18 3.75 17.35 3.75 16.5V9.75C3.75 8.9 4.4 8.25 5.25 8.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Inner document */}
      <motion.rect
        x="9.75"
        y="11.25"
        width="4.5"
        height="4.5"
        rx="0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.4}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED INVOICE
// ============================================
export function AnimatedInvoice({ 
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
      {/* Document */}
      <motion.path
        d="M8.25 4.5H15L18 7.5V19.5H8.25V4.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      <motion.path
        d="M15 4.5V7.5H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Text lines */}
      <motion.path
        d="M9.75 9.75H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M9.75 12H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M9.75 14.25H12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.5}
      />
      {/* Question badge */}
      <motion.path
        d="M11.25 7.5C11.25 6.975 11.66 6.56 12.2 6.56C12.7 6.56 13.125 6.86 13.125 7.425C13.125 7.875 12.86 8.14 12.45 8.29L12.2 8.4V9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
        variants={drawVariants}
        custom={delay + 0.6}
      />
      <motion.circle
        cx="12.2"
        cy="9.95"
        r="0.45"
        fill="currentColor"
        opacity="0.7"
        variants={scaleVariants}
        custom={delay + 0.7}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED EMAIL SUPPORT
// ============================================
export function AnimatedEmailSupport({ 
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
      {/* Envelope */}
      <motion.rect
        x="5.25"
        y="6.75"
        width="13.5"
        height="10.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        variants={drawVariants}
        custom={delay}
      />
      {/* Main fold line */}
      <motion.path
        d="M5.25 8.25L12 12.75L18.75 8.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      {/* Corner folds */}
      <motion.path
        d="M7.5 15L10.5 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M16.5 15L13.5 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      {/* @ symbol center */}
      <motion.circle
        cx="12"
        cy="11.25"
        r="1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={scaleVariants}
        custom={delay + 0.5}
      />
      <motion.path
        d="M12.94 11.25C12.94 11.775 12.56 12.075 12.08 12.075C11.63 12.075 11.25 11.7 11.25 11.1C11.25 10.575 11.63 10.31 12.1 10.31C12.55 10.31 12.94 10.6 12.94 11.1V12.15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED PHONE SUPPORT
// ============================================
export function AnimatedPhoneSupport({ 
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
      {/* Phone handset */}
      <motion.path
        d="M9 6L7.5 7.5C7.5 11.25 10.5 14.25 14.25 16.5L15.75 15C16.5 14.25 17.25 14.25 18 15L19.5 16.5C20.25 17.25 20.25 18.375 19.5 19.125C18.75 19.875 17.25 20.25 15.75 19.5C11.25 17.44 8.06 14.25 6 9.75C5.25 8.25 5.625 6.75 6.375 6C7.125 5.25 8.25 5.25 9 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Signal waves */}
      <motion.path
        d="M15 6.75C16.125 7.01 16.95 7.875 17.25 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M15 8.25C15.56 8.36 15.9 8.81 16.125 9.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.6}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED DARK MODE
// ============================================
export function AnimatedDarkMode({ 
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
      {/* Headset band */}
      <motion.path
        d="M7.5 10.5C7.5 8.2 9.3 6.375 11.625 6.375H12.375C14.7 6.375 16.5 8.2 16.5 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay}
      />
      {/* Ear pieces */}
      <motion.rect
        x="6"
        y="10.5"
        width="2.25"
        height="4.5"
        rx="0.75"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay + 0.2}
      />
      <motion.rect
        x="15.75"
        y="10.5"
        width="2.25"
        height="4.5"
        rx="0.75"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay + 0.2}
      />
      {/* Mic arm */}
      <motion.path
        d="M15.75 15C15.75 16.125 14.925 16.875 13.7 16.875H12.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      {/* Mic */}
      <motion.circle
        cx="12.75"
        cy="17.8"
        r="0.6"
        fill="currentColor"
        variants={scaleVariants}
        custom={delay + 0.5}
      />
      {/* Moon */}
      <motion.path
        d="M12 11.25C11.44 11.78 11.25 12.38 11.25 12.94C11.25 14.06 11.95 15 13.1 15C13.66 15 14.18 14.81 14.625 14.44C14 14.37 13.37 14.03 12.86 13.54C12.35 13.05 11.94 12.25 12 11.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.55}
      />
      {/* Star */}
      <motion.path
        d="M14.44 11.25L14.75 11.81L15.375 11.89L14.91 12.26L15.04 12.86L14.44 12.56L13.84 12.86L13.97 12.26L13.5 11.89L14.13 11.81L14.44 11.25Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
        custom={delay + 0.7}
      />
    </motion.svg>
  )
}

// ============================================
// ANIMATED LIGHT MODE
// ============================================
export function AnimatedLightMode({ 
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
      {/* Sun center */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        variants={scaleVariants}
        custom={delay}
      />
      {/* Sun rays */}
      <motion.path
        d="M12 5.25V7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.1}
      />
      <motion.path
        d="M12 16.5V18.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.15}
      />
      <motion.path
        d="M6.75 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.2}
      />
      <motion.path
        d="M15 12H17.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.25}
      />
      <motion.path
        d="M8.25 8.25L9.75 9.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.3}
      />
      <motion.path
        d="M14.25 14.25L15.75 15.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.35}
      />
      <motion.path
        d="M8.25 15.75L9.75 14.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.4}
      />
      <motion.path
        d="M14.25 9.75L15.75 8.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        custom={delay + 0.45}
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
  Offers: AnimatedOffers,
  About: AnimatedAbout,
  News: AnimatedNews,
  LoadingSpinner: AnimatedLoadingSpinner,
  // New animated icons
  Refresh: AnimatedRefresh,
  Terms: AnimatedTerms,
  Faq: AnimatedFaq,
  BankTransfer: AnimatedBankTransfer,
  CardPayment: AnimatedCardPayment,
  EditCoins: AnimatedEditCoins,
  Analytics: AnimatedAnalytics,
  Logout: AnimatedLogout,
  Delete: AnimatedDelete,
  Folder: AnimatedFolder,
  Invoice: AnimatedInvoice,
  EmailSupport: AnimatedEmailSupport,
  PhoneSupport: AnimatedPhoneSupport,
  DarkMode: AnimatedDarkMode,
  LightMode: AnimatedLightMode,
}

export default AnimatedIcons
