'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * AJIL Brand Patterns & Shapes
 * 
 * Unique, exclusive patterns based on the AJIL "A" motif
 * representing growth, ambition, and upward financial success.
 * 
 * Brand Colors:
 * - Primary Blue: #00377B / #0066B3
 * - Secondary Orange: #F7941D
 */

// ============================================
// 1. AJIL A-MESH PATTERN
// Modern grid with integrated A shapes
// ============================================
export function AjilVMesh({
  className = '',
  opacity = 0.04,
  color = 'primary', // 'primary' | 'secondary' | 'white'
  animated = false,
}: {
  className?: string
  opacity?: number
  color?: 'primary' | 'secondary' | 'white'
  animated?: boolean
}) {
  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    white: '#FFFFFF',
  }
  const strokeColor = colors[color]

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={{ duration: 1.5 }}
      >
        <defs>
          <pattern
            id="ajil-amesh"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* A shape in center */}
            <path
              d="M20 55 L40 20 L60 55"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* A crossbar */}
            <path
              d="M28 42 L52 42"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Connecting lines */}
            <line x1="0" y1="80" x2="20" y2="55" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="60" y1="55" x2="80" y2="80" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="40" y1="20" x2="40" y2="0" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            {/* Corner dots */}
            <circle cx="0" cy="80" r="2" fill={strokeColor} opacity="0.3" />
            <circle cx="80" cy="80" r="2" fill={strokeColor} opacity="0.3" />
            <circle cx="40" cy="0" r="2" fill={strokeColor} opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-amesh)" />
      </motion.svg>
    </div>
  )
}

// ============================================
// 2. AJIL GROWTH LINES
// Ascending A-shaped lines representing financial growth
// ============================================
export function AjilGrowthLines({
  className = '',
  variant = 'ascending', // 'ascending' | 'converging' | 'radiating'
  color = 'primary',
  opacity = 0.08,
  animated = true,
}: {
  className?: string
  variant?: 'ascending' | 'converging' | 'radiating'
  color?: 'primary' | 'secondary' | 'gradient'
  opacity?: number
  animated?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    gradient: 'url(#growth-gradient)',
  }

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity }}
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated && isInView ? { opacity } : undefined}
      transition={{ duration: 1.2 }}
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="growth-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00377B" />
            <stop offset="100%" stopColor="#F7941D" />
          </linearGradient>
        </defs>

        {variant === 'ascending' && (
          <>
            {/* Multiple ascending A-shapes representing growth */}
            <motion.path
              d="M0 280 L100 180 L200 280 M60 240 L140 240"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0 }}
            />
            <motion.path
              d="M50 250 L150 120 L250 250 M100 200 L200 200"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M100 220 L200 60 L300 220 M150 160 L250 160"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path
              d="M150 190 L250 20 L350 190 M200 120 L300 120"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </>
        )}

        {variant === 'converging' && (
          <>
            {/* Lines converging to form an A at top */}
            <motion.path
              d="M0 300 L200 50"
              stroke={colors[color]}
              strokeWidth="1.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2 }}
            />
            <motion.path
              d="M400 300 L200 50"
              stroke={colors[color]}
              strokeWidth="1.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.1 }}
            />
            <motion.path
              d="M100 300 L200 50"
              stroke={colors[color]}
              strokeWidth="1"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.path
              d="M300 300 L200 50"
              stroke={colors[color]}
              strokeWidth="1"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            {/* A crossbar accent */}
            <motion.path
              d="M120 180 L280 180"
              stroke="#F7941D"
              strokeWidth="3"
              strokeLinecap="round"
              initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </>
        )}

        {variant === 'radiating' && (
          <>
            {/* A shapes radiating outward */}
            <motion.path
              d="M180 180 L200 140 L220 180 M188 168 L212 168"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M140 220 L200 100 L260 220 M160 180 L240 180"
              stroke={colors[color]}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.6"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <motion.path
              d="M100 260 L200 60 L300 260 M130 190 L270 190"
              stroke={colors[color]}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.4"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
            <motion.path
              d="M60 300 L200 20 L340 300 M100 200 L300 200"
              stroke={colors[color]}
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.2"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 1.1, delay: 0.6 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  )
}

// ============================================
// 3. AJIL DOTS MATRIX
// Dots arranged in A formations
// ============================================
export function AjilDotsMatrix({
  className = '',
  opacity = 0.06,
  color = 'primary',
  density = 'normal', // 'sparse' | 'normal' | 'dense'
}: {
  className?: string
  opacity?: number
  color?: 'primary' | 'secondary' | 'mixed'
  density?: 'sparse' | 'normal' | 'dense'
}) {
  const sizes = {
    sparse: 120,
    normal: 80,
    dense: 50,
  }
  const patternSize = sizes[density]

  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    mixed: '#00377B', // Will use both in pattern
  }

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`ajil-dots-${density}`}
            x="0"
            y="0"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            {/* A-shaped dot arrangement - apex at top */}
            <circle cx={patternSize * 0.5} cy={patternSize * 0.15} r="3" fill={colors[color]} />
            <circle cx={patternSize * 0.35} cy={patternSize * 0.4} r="2.5" fill={color === 'mixed' ? '#F7941D' : colors[color]} />
            <circle cx={patternSize * 0.65} cy={patternSize * 0.4} r="2.5" fill={color === 'mixed' ? '#F7941D' : colors[color]} />
            <circle cx={patternSize * 0.2} cy={patternSize * 0.7} r="2" fill={colors[color]} />
            <circle cx={patternSize * 0.8} cy={patternSize * 0.7} r="2" fill={colors[color]} />
            {/* A crossbar dots */}
            <circle cx={patternSize * 0.35} cy={patternSize * 0.55} r="1.5" fill="#F7941D" opacity="0.7" />
            <circle cx={patternSize * 0.5} cy={patternSize * 0.55} r="1.5" fill="#F7941D" opacity="0.7" />
            <circle cx={patternSize * 0.65} cy={patternSize * 0.55} r="1.5" fill="#F7941D" opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ajil-dots-${density})`} />
      </svg>
    </div>
  )
}

// ============================================
// 4. AJIL WAVE PATTERN
// Flowing waves with A-shaped peaks
// ============================================
export function AjilWavePattern({
  className = '',
  position = 'bottom', // 'top' | 'bottom'
  color = 'primary',
  height = 120,
  animated = true,
}: {
  className?: string
  position?: 'top' | 'bottom'
  color?: 'primary' | 'secondary' | 'gradient'
  height?: number
  animated?: boolean
}) {
  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    gradient: 'url(#wave-gradient)',
  }

  const isTop = position === 'top'

  return (
    <div 
      className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 pointer-events-none overflow-hidden ${className}`}
      style={{ height, transform: isTop ? 'rotate(180deg)' : undefined }}
    >
      <motion.svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00377B" />
            <stop offset="50%" stopColor="#0066B3" />
            <stop offset="100%" stopColor="#F7941D" />
          </linearGradient>
        </defs>
        
        {/* Main wave with A-shaped peaks (pointing up) */}
        <motion.path
          d="M0 100 
             L120 100 L240 30 L360 100 
             L480 100 L600 30 L720 100 
             L840 100 L960 30 L1080 100 
             L1200 100 L1320 30 L1440 100 
             L1440 120 L0 120 Z"
          fill={colors[color]}
          opacity="0.08"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 2 }}
        />
        
        {/* Secondary wave layer with smaller A peaks */}
        <motion.path
          d="M0 110 
             L180 110 L300 50 L420 110 
             L540 110 L660 50 L780 110 
             L900 110 L1020 50 L1140 110 
             L1260 110 L1380 50 L1440 90 
             L1440 120 L0 120 Z"
          fill={colors[color]}
          opacity="0.05"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, delay: 0.3 }}
        />
      </motion.svg>
    </div>
  )
}

// ============================================
// 5. AJIL GEOMETRIC ACCENT
// Single decorative A-based shape for corners/edges
// ============================================
export function AjilGeometricAccent({
  className = '',
  size = 200,
  variant = 'corner', // 'corner' | 'edge' | 'float'
  color = 'primary',
  animated = true,
}: {
  className?: string
  size?: number
  variant?: 'corner' | 'edge' | 'float'
  color?: 'primary' | 'secondary' | 'gradient'
  animated?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    gradient: 'url(#accent-gradient)',
  }

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated && isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00377B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F7941D" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {variant === 'corner' && (
          <>
            {/* Layered A shapes for corner */}
            <motion.path
              d="M10 85 L50 15 L90 85"
              stroke={colors[color]}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.15"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M25 60 L75 60"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.12"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.path
              d="M20 75 L50 25 L80 75"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.1"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.path
              d="M30 65 L50 35 L70 65"
              stroke="#F7941D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.2"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.path
              d="M38 55 L62 55"
              stroke="#F7941D"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.15"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </>
        )}

        {variant === 'edge' && (
          <>
            {/* Horizontal edge pattern with A peaks */}
            <motion.path
              d="M0 70 L25 30 L50 70 L75 30 L100 70"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.12"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5 }}
            />
            {/* A crossbars */}
            <motion.path
              d="M12 55 L38 55 M62 55 L88 55"
              stroke="#F7941D"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.1"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </>
        )}

        {variant === 'float' && (
          <motion.g
            animate={animated ? {
              y: [0, -5, 0],
              rotate: [0, 2, 0],
            } : undefined}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Floating A with glow effect */}
            <motion.path
              d="M25 75 L50 25 L75 75"
              stroke={colors[color]}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.15"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M35 55 L65 55"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.12"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.path
              d="M35 65 L50 35 L65 65"
              stroke="#F7941D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.25"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.path
              d="M42 52 L58 52"
              stroke="#F7941D"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.2"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.4, delay: 1 }}
            />
            {/* Glow circle at apex */}
            <circle
              cx="50"
              cy="25"
              r="8"
              fill="#F7941D"
              opacity="0.1"
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  )
}

// ============================================
// 6. AJIL SPEED LINES
// Dynamic A-shaped lines suggesting swift/agile movement
// ============================================
export function AjilSpeedLines({
  className = '',
  direction = 'right', // 'left' | 'right'
  opacity = 0.06,
  animated = true,
}: {
  className?: string
  direction?: 'left' | 'right'
  opacity?: number
  animated?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        opacity,
        transform: direction === 'left' ? 'scaleX(-1)' : undefined,
      }}
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated && isInView ? { opacity } : undefined}
      transition={{ duration: 1 }}
    >
      <svg
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Speed lines forming A shapes - apex pointing forward */}
        <motion.path
          d="M0 350 L300 50 L600 350"
          stroke="#00377B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d="M100 220 L500 220"
          stroke="#00377B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.6 } : undefined}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        <motion.path
          d="M50 320 L300 80 L550 320"
          stroke="#00377B"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.7 } : undefined}
          transition={{ duration: 1.5, delay: 0.1 }}
        />
        <motion.path
          d="M130 210 L470 210"
          stroke="#0066B3"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.5 } : undefined}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        
        <motion.path
          d="M100 290 L300 110 L500 290"
          stroke="#0066B3"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.5 } : undefined}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        
        {/* Accent streaks extending from apex */}
        <motion.line
          x1="300" y1="50" x2="800" y2="50"
          stroke="#F7941D"
          strokeWidth="1.5"
          opacity="0.5"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.line
          x1="300" y1="80" x2="750" y2="80"
          stroke="#F7941D"
          strokeWidth="1"
          opacity="0.3"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.line
          x1="300" y1="110" x2="700" y2="110"
          stroke="#F7941D"
          strokeWidth="0.75"
          opacity="0.2"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </svg>
    </motion.div>
  )
}

// ============================================
// 7. AJIL HEXAGON GRID
// Modern fintech hexagon grid with A accents
// ============================================
export function AjilHexGrid({
  className = '',
  opacity = 0.04,
  color = 'primary',
}: {
  className?: string
  opacity?: number
  color?: 'primary' | 'secondary'
}) {
  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
  }

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="ajil-hexgrid"
            x="0"
            y="0"
            width="100"
            height="86.6"
            patternUnits="userSpaceOnUse"
          >
            {/* Hexagon with A inside */}
            <path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke={colors[color]}
              strokeWidth="1"
              transform="translate(0, -6.7)"
            />
            {/* A inside hexagon */}
            <path
              d="M30 60 L50 25 L70 60"
              fill="none"
              stroke={colors[color]}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
              transform="translate(0, -6.7)"
            />
            {/* A crossbar */}
            <path
              d="M38 48 L62 48"
              fill="none"
              stroke={colors[color]}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.4"
              transform="translate(0, -6.7)"
            />
            {/* Offset hexagon */}
            <path
              d="M50 43.3 L93.3 68.3 L93.3 118.3 L50 143.3 L6.7 118.3 L6.7 68.3 Z"
              fill="none"
              stroke={colors[color]}
              strokeWidth="0.5"
              opacity="0.3"
              transform="translate(50, 0)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-hexgrid)" />
      </svg>
    </div>
  )
}

// ============================================
// EXPORT ALL PATTERNS
// All patterns use the AJIL "A" motif representing
// growth, ambition, and upward success
// ============================================
export const AjilPatterns = {
  AMesh: AjilVMesh,        // A-shaped mesh grid
  GrowthLines: AjilGrowthLines,  // Ascending A formations
  DotsMatrix: AjilDotsMatrix,    // Dots in A arrangement
  WavePattern: AjilWavePattern,  // Waves with A peaks
  GeometricAccent: AjilGeometricAccent,  // A-shaped accents
  SpeedLines: AjilSpeedLines,    // A-shaped speed lines
  HexGrid: AjilHexGrid,          // Hexagons with A inside
}

export default AjilPatterns
