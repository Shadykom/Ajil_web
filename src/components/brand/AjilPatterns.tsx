'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * AJIL Brand Patterns & Shapes
 * 
 * Unique, exclusive patterns based on the AJIL "V" motif
 * representing growth, success, and swift financial solutions.
 * 
 * Brand Colors:
 * - Primary Blue: #00377B / #0066B3
 * - Secondary Orange: #F7941D
 */

// ============================================
// 1. AJIL V-MESH PATTERN
// Modern grid with integrated V shapes
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
            id="ajil-vmesh"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* V shape in center */}
            <path
              d="M20 20 L40 50 L60 20"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Connecting lines */}
            <line x1="0" y1="0" x2="20" y2="20" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="60" y1="20" x2="80" y2="0" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            <line x1="40" y1="50" x2="40" y2="80" stroke={strokeColor} strokeWidth="0.5" opacity="0.5" />
            {/* Corner dots */}
            <circle cx="0" cy="0" r="2" fill={strokeColor} opacity="0.3" />
            <circle cx="80" cy="0" r="2" fill={strokeColor} opacity="0.3" />
            <circle cx="40" cy="80" r="2" fill={strokeColor} opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-vmesh)" />
      </motion.svg>
    </div>
  )
}

// ============================================
// 2. AJIL GROWTH LINES
// Ascending lines representing financial growth
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
            {/* Multiple ascending V-lines representing growth */}
            <motion.path
              d="M0 280 L100 180 L200 280"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0 }}
            />
            <motion.path
              d="M50 250 L150 120 L250 250"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M100 220 L200 60 L300 220"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path
              d="M150 190 L250 20 L350 190"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.3"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </>
        )}

        {variant === 'converging' && (
          <>
            {/* Lines converging to a point - representing focus */}
            <motion.path
              d="M0 0 L200 250"
              stroke={colors[color]}
              strokeWidth="1.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2 }}
            />
            <motion.path
              d="M400 0 L200 250"
              stroke={colors[color]}
              strokeWidth="1.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.1 }}
            />
            <motion.path
              d="M100 0 L200 250"
              stroke={colors[color]}
              strokeWidth="1"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.path
              d="M300 0 L200 250"
              stroke={colors[color]}
              strokeWidth="1"
              opacity="0.5"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            {/* V accent at convergence point */}
            <motion.path
              d="M170 220 L200 260 L230 220"
              stroke="#F7941D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </>
        )}

        {variant === 'radiating' && (
          <>
            {/* V shapes radiating outward */}
            <motion.path
              d="M180 150 L200 180 L220 150"
              stroke={colors[color]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M140 120 L200 200 L260 120"
              stroke={colors[color]}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <motion.path
              d="M100 90 L200 220 L300 90"
              stroke={colors[color]}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated && isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
            <motion.path
              d="M60 60 L200 240 L340 60"
              stroke={colors[color]}
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
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
// Dots arranged in V formations
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
            {/* V-shaped dot arrangement */}
            <circle cx={patternSize * 0.2} cy={patternSize * 0.3} r="2" fill={colors[color]} />
            <circle cx={patternSize * 0.35} cy={patternSize * 0.5} r="2.5" fill={color === 'mixed' ? '#F7941D' : colors[color]} />
            <circle cx={patternSize * 0.5} cy={patternSize * 0.7} r="3" fill={colors[color]} />
            <circle cx={patternSize * 0.65} cy={patternSize * 0.5} r="2.5" fill={color === 'mixed' ? '#F7941D' : colors[color]} />
            <circle cx={patternSize * 0.8} cy={patternSize * 0.3} r="2" fill={colors[color]} />
            {/* Accent dots */}
            <circle cx={patternSize * 0.5} cy={patternSize * 0.2} r="1" fill={colors[color]} opacity="0.4" />
            <circle cx={patternSize * 0.5} cy={patternSize * 0.9} r="1" fill="#F7941D" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ajil-dots-${density})`} />
      </svg>
    </div>
  )
}

// ============================================
// 4. AJIL WAVE PATTERN
// Flowing waves with V peaks
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
        
        {/* Main wave with V-shaped peaks */}
        <motion.path
          d="M0 60 
             Q120 20 240 60 
             L360 20 L480 60 
             Q600 100 720 60 
             L840 20 L960 60 
             Q1080 100 1200 60 
             L1320 20 L1440 60 
             L1440 120 L0 120 Z"
          fill={colors[color]}
          opacity="0.08"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 2 }}
        />
        
        {/* Secondary wave layer */}
        <motion.path
          d="M0 80 
             L180 40 L360 80 
             Q540 120 720 80 
             L900 40 L1080 80 
             Q1260 120 1440 80 
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
// Single decorative V-based shape for corners/edges
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
            {/* Layered V shapes for corner */}
            <motion.path
              d="M10 10 L50 70 L90 10"
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
              d="M20 18 L50 60 L80 18"
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
              d="M30 26 L50 50 L70 26"
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
          </>
        )}

        {variant === 'edge' && (
          <>
            {/* Horizontal edge pattern */}
            <motion.path
              d="M0 50 L25 30 L50 50 L75 30 L100 50"
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
            <motion.path
              d="M0 60 L25 40 L50 60 L75 40 L100 60"
              stroke="#F7941D"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.08"
              initial={animated ? { pathLength: 0 } : undefined}
              animate={animated && isInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.3 }}
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
            {/* Floating V with glow effect */}
            <motion.path
              d="M25 25 L50 65 L75 25"
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
              d="M35 32 L50 55 L65 32"
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
            {/* Glow circle */}
            <circle
              cx="50"
              cy="55"
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
// Dynamic lines suggesting swift/agile movement
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
        {/* Speed lines emanating in V formation */}
        <motion.path
          d="M0 200 L300 100 L600 200"
          stroke="#00377B"
          strokeWidth="2"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d="M50 200 L300 130 L550 200"
          stroke="#00377B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.7 } : undefined}
          transition={{ duration: 1.5, delay: 0.1 }}
        />
        <motion.path
          d="M100 200 L300 160 L500 200"
          stroke="#0066B3"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.5 } : undefined}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        
        {/* Lower V lines */}
        <motion.path
          d="M0 200 L300 300 L600 200"
          stroke="#00377B"
          strokeWidth="2"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.path
          d="M50 200 L300 270 L550 200"
          stroke="#F7941D"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1, opacity: 0.6 } : undefined}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        
        {/* Accent streaks */}
        <motion.line
          x1="300" y1="100" x2="800" y2="100"
          stroke="#F7941D"
          strokeWidth="1"
          opacity="0.4"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.line
          x1="300" y1="300" x2="800" y2="300"
          stroke="#F7941D"
          strokeWidth="1"
          opacity="0.4"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </svg>
    </motion.div>
  )
}

// ============================================
// 7. AJIL HEXAGON GRID
// Modern fintech hexagon grid with V accents
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
            {/* Hexagon with V inside */}
            <path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke={colors[color]}
              strokeWidth="1"
              transform="translate(0, -6.7)"
            />
            {/* V inside hexagon */}
            <path
              d="M30 25 L50 55 L70 25"
              fill="none"
              stroke={colors[color]}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
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
// ============================================
export const AjilPatterns = {
  VMesh: AjilVMesh,
  GrowthLines: AjilGrowthLines,
  DotsMatrix: AjilDotsMatrix,
  WavePattern: AjilWavePattern,
  GeometricAccent: AjilGeometricAccent,
  SpeedLines: AjilSpeedLines,
  HexGrid: AjilHexGrid,
}

export default AjilPatterns
