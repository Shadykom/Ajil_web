'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AjilLogoProps {
  size?: number | string
  width?: number | string
  height?: number | string
  className?: string
  variant?: 'primary' | 'white' | 'gradient'
  animated?: boolean
  showText?: boolean
}

/**
 * AJIL Finance Official Logo Component
 * 
 * The logo consists of:
 * - The iconic "A" symbol (representing AJIL, ambition, and upward growth)
 * - Arabic text "أجيـــل" 
 * - English text "AJIL"
 * - Tagline "FINANCE" or "للتمويل"
 */

// Primary Blue: #00377B
// Secondary Orange: #F7941D

export function AjilLogo({
  size,
  width = size || 150,
  height = size ? Number(size) * 0.6 : 90,
  className = '',
  variant = 'primary',
  animated = false,
  showText = true,
}: AjilLogoProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    primary: {
      main: '#00377B',
      accent: '#F7941D',
      text: '#00377B',
    },
    white: {
      main: '#FFFFFF',
      accent: '#F7941D',
      text: '#FFFFFF',
    },
    gradient: {
      main: 'url(#ajil-gradient)',
      accent: '#F7941D',
      text: '#00377B',
    },
  }

  const currentColors = colors[variant]

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  }

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.5 },
    },
  }

  const MotionPath = animated ? motion.path : 'path'
  const MotionG = animated ? motion.g : 'g'

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      width={width}
      height={height}
      className={className}
      aria-label="AJIL Finance Logo"
    >
      <defs>
        <linearGradient id="ajil-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00377B" />
          <stop offset="100%" stopColor="#0066b3" />
        </linearGradient>
        <linearGradient id="ajil-a-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7941D" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>
      </defs>

      {/* Main A Symbol - The iconic AJIL mark */}
      <MotionPath
        d="M70 55 L100 15 L130 55"
        fill="none"
        stroke={currentColors.main}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animated && {
          variants: drawVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
        })}
      />

      {/* A crossbar */}
      <MotionPath
        d="M78 42 L122 42"
        fill="none"
        stroke={currentColors.main}
        strokeWidth="5"
        strokeLinecap="round"
        {...(animated && {
          variants: drawVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
          transition: { delay: 0.5 },
        })}
      />

      {/* Inner A accent */}
      <MotionPath
        d="M80 48 L100 22 L120 48"
        fill="none"
        stroke={currentColors.accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animated && {
          variants: drawVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
          transition: { delay: 0.3 },
        })}
      />

      {/* Inner A crossbar accent */}
      <MotionPath
        d="M86 38 L114 38"
        fill="none"
        stroke={currentColors.accent}
        strokeWidth="2"
        strokeLinecap="round"
        {...(animated && {
          variants: drawVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
          transition: { delay: 0.6 },
        })}
      />

      {showText && (
        <MotionG
          {...(animated && {
            variants: fadeVariants,
            initial: 'hidden',
            animate: isInView ? 'visible' : 'hidden',
          })}
        >
          {/* Arabic Text - أجيل */}
          <text
            x="100"
            y="80"
            textAnchor="middle"
            fill={currentColors.text}
            fontFamily="Arial, sans-serif"
            fontSize="24"
            fontWeight="bold"
            direction="rtl"
          >
            أجيـــل
          </text>

          {/* English Text - FINANCE */}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            fill={currentColors.accent}
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="3"
          >
            FINANCE
          </text>
        </MotionG>
      )}
    </svg>
  )
}

/**
 * AJIL Logo Mark Only (A Symbol)
 * For use as favicon, app icon, or decorative element
 */
export function AjilLogoMark({
  size = 48,
  className = '',
  variant = 'primary',
  animated = false,
}: Omit<AjilLogoProps, 'showText' | 'width' | 'height'>) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    primary: { main: '#00377B', accent: '#F7941D' },
    white: { main: '#FFFFFF', accent: '#F7941D' },
    gradient: { main: 'url(#mark-gradient)', accent: '#F7941D' },
  }

  const currentColors = colors[variant]

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-label="AJIL Logo Mark"
      initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animated && isInView ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <defs>
        <linearGradient id="mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00377B" />
          <stop offset="100%" stopColor="#0066b3" />
        </linearGradient>
      </defs>

      {/* Main A */}
      <motion.path
        d="M8 38 L24 10 L40 38"
        fill="none"
        stroke={currentColors.main}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* A crossbar */}
      <motion.path
        d="M14 28 L34 28"
        fill="none"
        stroke={currentColors.main}
        strokeWidth="3"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Inner accent A */}
      <motion.path
        d="M14 32 L24 16 L34 32"
        fill="none"
        stroke={currentColors.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
      />

      {/* Inner A crossbar accent */}
      <motion.path
        d="M18 25 L30 25"
        fill="none"
        stroke={currentColors.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.6, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

/**
 * Floating AJIL Logo for Background Decoration
 * Semi-transparent, large scale for visual interest
 */
export function AjilLogoBackground({
  size = 400,
  className = '',
  opacity = 0.05,
  animated = true,
}: {
  size?: number
  className?: string
  opacity?: number
  animated?: boolean
}) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      animate={animated ? {
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      } : undefined}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-hidden="true"
      >
        {/* Large decorative A pattern */}
        <path
          d="M10 85 L50 15 L90 85"
          fill="none"
          stroke="#00377B"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 60 L78 60"
          fill="none"
          stroke="#00377B"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M20 75 L50 25 L80 75"
          fill="none"
          stroke="#00377B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <path
          d="M30 55 L70 55"
          fill="none"
          stroke="#00377B"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M30 65 L50 35 L70 65"
          fill="none"
          stroke="#F7941D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          d="M38 52 L62 52"
          fill="none"
          stroke="#F7941D"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  )
}

/**
 * AJIL Watermark Pattern
 * Repeating logo pattern for backgrounds
 */
export function AjilWatermarkPattern({
  className = '',
  opacity = 0.03,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="ajil-watermark"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* A shape */}
            <path
              d="M50 130 L100 40 L150 130"
              fill="none"
              stroke="#00377B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* A crossbar */}
            <path
              d="M65 95 L135 95"
              fill="none"
              stroke="#00377B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Inner A */}
            <path
              d="M65 115 L100 55 L135 115"
              fill="none"
              stroke="#00377B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
            {/* Inner A crossbar */}
            <path
              d="M78 90 L122 90"
              fill="none"
              stroke="#00377B"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-watermark)" />
      </svg>
    </div>
  )
}

export default AjilLogo
