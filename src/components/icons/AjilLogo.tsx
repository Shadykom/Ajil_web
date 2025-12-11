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
 * - The iconic "V" symbol (representing growth and success)
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
        <linearGradient id="ajil-v-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7941D" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>
      </defs>

      {/* Main V Symbol - The iconic AJIL mark */}
      <MotionPath
        d="M70 15 L100 55 L130 15"
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

      {/* Inner V accent */}
      <MotionPath
        d="M80 22 L100 48 L120 22"
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
 * AJIL Logo Mark Only (V Symbol)
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

      {/* Main V */}
      <motion.path
        d="M8 12 L24 36 L40 12"
        fill="none"
        stroke={currentColors.main}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Inner accent V */}
      <motion.path
        d="M14 16 L24 30 L34 16"
        fill="none"
        stroke={currentColors.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
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
        {/* Large decorative V pattern */}
        <path
          d="M10 20 L50 80 L90 20"
          fill="none"
          stroke="#00377B"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 28 L50 70 L80 28"
          fill="none"
          stroke="#00377B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <path
          d="M30 36 L50 60 L70 36"
          fill="none"
          stroke="#F7941D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
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
            <path
              d="M50 40 L100 120 L150 40"
              fill="none"
              stroke="#00377B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 50 L100 105 L140 50"
              fill="none"
              stroke="#00377B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-watermark)" />
      </svg>
    </div>
  )
}

export default AjilLogo
