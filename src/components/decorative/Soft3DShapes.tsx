'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

// ============================================
// 1. SOFT 3D BUBBLE CURVE
// Deep blue to violet gradient bubble
// ============================================
export function BubbleCurve({ 
  className = '',
  size = 300,
  animate = true,
  delay = 0,
}: {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animate ? {
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        } : undefined}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Main bubble body */}
        <div 
          className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
          style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #3b5998 30%, #6b5b95 60%, #9b59b6 100%)',
            boxShadow: `
              0 ${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.15),
              inset 0 ${size * 0.05}px ${size * 0.1}px rgba(255,255,255,0.2),
              inset 0 -${size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.1)
            `,
            filter: 'blur(0.5px)',
          }}
        />
        {/* Highlight */}
        <div 
          className="absolute rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
          style={{
            top: '8%',
            left: '15%',
            width: '40%',
            height: '30%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Subtle inner glow */}
        <div 
          className="absolute inset-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 2. PILLOWY RIBBON SHAPE
// Silky neumorphic texture ribbon
// ============================================
export function PillowyRibbon({ 
  className = '',
  width = 400,
  height = 150,
  animate = true,
  delay = 0,
}: {
  className?: string
  width?: number
  height?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={animate ? {
          y: [0, -10, 0],
          rotateZ: [0, 2, 0],
        } : undefined}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 400 150" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a365d" />
              <stop offset="50%" stopColor="#4c5c96" />
              <stop offset="100%" stopColor="#805ad5" />
            </linearGradient>
            <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.15" />
            </filter>
            <filter id="ribbonInner" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" />
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
              <feBlend in2="SourceGraphic" mode="normal" />
            </filter>
          </defs>
          <path
            d="M20 100 Q80 40 160 80 Q240 120 300 60 Q360 20 380 70"
            stroke="url(#ribbonGrad)"
            strokeWidth="50"
            strokeLinecap="round"
            fill="none"
            filter="url(#ribbonShadow)"
          />
          {/* Highlight line */}
          <path
            d="M25 90 Q85 35 165 70 Q245 105 305 50 Q365 15 382 60"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'blur(2px)' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 3. FLOATING LIQUID DROP
// Glossy soft-UI drop shape
// ============================================
export function LiquidDrop({ 
  className = '',
  size = 200,
  animate = true,
  delay = 0,
}: {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size * 1.2 }}
        animate={animate ? {
          y: [0, -12, 0],
          scale: [1, 1.02, 1],
        } : undefined}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Drop body */}
        <div 
          className="absolute inset-0"
          style={{
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: 'linear-gradient(160deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
            boxShadow: `
              0 ${size * 0.15}px ${size * 0.25}px rgba(0,0,0,0.12),
              0 ${size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.08),
              inset 0 ${size * 0.08}px ${size * 0.15}px rgba(255,255,255,0.25),
              inset 0 -${size * 0.05}px ${size * 0.15}px rgba(0,0,0,0.15)
            `,
          }}
        />
        {/* Glossy highlight */}
        <div 
          className="absolute"
          style={{
            top: '10%',
            left: '20%',
            width: '35%',
            height: '25%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />
        {/* Secondary highlight */}
        <div 
          className="absolute"
          style={{
            top: '50%',
            right: '15%',
            width: '15%',
            height: '15%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            filter: 'blur(3px)',
          }}
        />
        {/* Contact shadow */}
        <div 
          className="absolute"
          style={{
            bottom: `-${size * 0.1}px`,
            left: '20%',
            width: '60%',
            height: '15%',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.1)',
            filter: `blur(${size * 0.05}px)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 4. SOFT POLYGON BLOB
// Premium fintech polygon shape
// ============================================
export function PolygonBlob({ 
  className = '',
  size = 250,
  animate = true,
  delay = 0,
}: {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animate ? {
          rotate: [0, 5, 0],
          scale: [1, 1.03, 1],
        } : undefined}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d4f6e" />
              <stop offset="40%" stopColor="#2d6a8a" />
              <stop offset="100%" stopColor="#48c6ef" />
            </linearGradient>
            <filter id="polyShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0d4f6e" floodOpacity="0.2" />
            </filter>
          </defs>
          <path
            d="M50 5 L85 25 L95 55 L80 85 L45 95 L15 80 L5 45 L20 20 Z"
            fill="url(#polyGrad)"
            filter="url(#polyShadow)"
            style={{ filter: 'blur(0.3px)' }}
          />
          {/* Inner bevel effect */}
          <path
            d="M50 12 L78 28 L87 53 L74 78 L47 87 L22 74 L13 47 L25 25 Z"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Top highlight */}
          <ellipse cx="40" cy="30" rx="15" ry="10" fill="rgba(255,255,255,0.2)" style={{ filter: 'blur(3px)' }} />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 5. DUAL-LAYER SOFT OVAL
// Stacked translucent layers
// ============================================
export function DualLayerOval({ 
  className = '',
  width = 300,
  height = 200,
  animate = true,
  delay = 0,
}: {
  className?: string
  width?: number
  height?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={animate ? {
          y: [0, -8, 0],
        } : undefined}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Back layer */}
        <motion.div
          className="absolute"
          style={{
            top: '15%',
            left: '10%',
            width: '85%',
            height: '80%',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, rgba(100,120,180,0.4) 0%, rgba(150,100,200,0.3) 100%)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
          }}
          animate={animate ? {
            x: [0, 5, 0],
          } : undefined}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Front layer */}
        <motion.div
          className="absolute"
          style={{
            top: '5%',
            left: '5%',
            width: '80%',
            height: '75%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(79,172,254,0.5) 0%, rgba(102,126,234,0.4) 50%, rgba(118,75,162,0.3) 100%)',
            boxShadow: `
              0 10px 30px rgba(0,0,0,0.12),
              inset 0 3px 8px rgba(255,255,255,0.3),
              inset 0 -3px 8px rgba(0,0,0,0.1)
            `,
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
          animate={animate ? {
            x: [0, -3, 0],
          } : undefined}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        {/* White rim highlight */}
        <div 
          className="absolute"
          style={{
            top: '8%',
            left: '12%',
            width: '40%',
            height: '20%',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 6. FLOWING 3D WAVE SHAPE
// Dynamic curved wave
// ============================================
export function FlowingWave({ 
  className = '',
  width = 500,
  height = 200,
  animate = true,
  delay = 0,
}: {
  className?: string
  width?: number
  height?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={animate ? {
          y: [0, -10, 0],
        } : undefined}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
            <filter id="waveShadow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#667eea" floodOpacity="0.2" />
            </filter>
          </defs>
          <path
            d="M0 100 Q80 40 160 90 T320 80 T480 100 Q500 110 500 120 L500 180 Q400 150 250 160 Q100 170 0 150 Z"
            fill="url(#waveGrad)"
            filter="url(#waveShadow)"
          />
          {/* Top highlight */}
          <path
            d="M10 95 Q85 40 165 85 T325 75 T475 95"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            style={{ filter: 'blur(2px)' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 7. GLASSY SOFT-UI BLOB
// Transparent glass-morphism blob
// ============================================
export function GlassyBlob({ 
  className = '',
  size = 280,
  animate = true,
  delay = 0,
}: {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animate ? {
          scale: [1, 1.04, 1],
          rotate: [0, 2, 0],
        } : undefined}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Main glass blob */}
        <div 
          className="absolute inset-0"
          style={{
            borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(100,150,255,0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: `
              0 ${size * 0.1}px ${size * 0.15}px rgba(0,0,0,0.08),
              inset 0 ${size * 0.02}px ${size * 0.05}px rgba(255,255,255,0.3),
              inset 0 -${size * 0.02}px ${size * 0.05}px rgba(100,100,200,0.1)
            `,
          }}
        />
        {/* Internal glow */}
        <div 
          className="absolute inset-[20%]"
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(100,150,255,0.15) 0%, transparent 70%)',
            filter: 'blur(5px)',
          }}
        />
        {/* Refraction highlights */}
        <div 
          className="absolute"
          style={{
            top: '15%',
            left: '20%',
            width: '30%',
            height: '20%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
        <div 
          className="absolute"
          style={{
            bottom: '25%',
            right: '20%',
            width: '20%',
            height: '15%',
            borderRadius: '50%',
            background: 'rgba(150,120,255,0.2)',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 8. SOFT HEXAGON CAPSULE
// Hexagon + capsule hybrid
// ============================================
export function HexagonCapsule({ 
  className = '',
  width = 200,
  height = 250,
  animate = true,
  delay = 0,
}: {
  className?: string
  width?: number
  height?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={animate ? {
          y: [0, -10, 0],
          rotateY: [0, 5, 0],
        } : undefined}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 125" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a365d" />
              <stop offset="60%" stopColor="#2d3748" />
              <stop offset="100%" stopColor="#805ad5" />
            </linearGradient>
            <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1a365d" floodOpacity="0.25" />
            </filter>
          </defs>
          {/* Capsule body with hex-inspired edges */}
          <path
            d="M50 5 L80 20 Q95 30 95 50 L95 80 Q95 95 80 105 L50 120 L20 105 Q5 95 5 80 L5 50 Q5 30 20 20 Z"
            fill="url(#hexGrad)"
            filter="url(#hexShadow)"
          />
          {/* Highlight edge */}
          <path
            d="M50 10 L75 22 Q88 30 88 48 L88 78"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Violet highlight edge */}
          <path
            d="M12 78 L12 48 Q12 30 25 22 L50 10"
            stroke="rgba(180,100,255,0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Top glow */}
          <ellipse cx="45" cy="30" rx="18" ry="10" fill="rgba(255,255,255,0.15)" style={{ filter: 'blur(3px)' }} />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 9. SOFT ROUNDED TRIANGLE
// Pillowy inflated triangle
// ============================================
export function RoundedTriangle({ 
  className = '',
  size = 220,
  animate = true,
  delay = 0,
}: {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animate ? {
          rotate: [0, 3, 0],
          y: [0, -8, 0],
        } : undefined}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="triGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#5a67d8" />
              <stop offset="100%" stopColor="#9f7aea" />
            </linearGradient>
            <filter id="triShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#667eea" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* Rounded triangle */}
          <path
            d="M50 10 Q65 10 75 30 L90 70 Q95 85 80 90 L20 90 Q5 85 10 70 L25 30 Q35 10 50 10 Z"
            fill="url(#triGrad)"
            filter="url(#triShadow)"
          />
          {/* Inner pillow effect */}
          <path
            d="M50 20 Q60 20 68 35 L78 65 Q82 75 72 78 L28 78 Q18 75 22 65 L32 35 Q40 20 50 20 Z"
            fill="rgba(255,255,255,0.08)"
          />
          {/* Top highlight */}
          <ellipse cx="48" cy="32" rx="12" ry="8" fill="rgba(255,255,255,0.25)" style={{ filter: 'blur(2px)' }} />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 10. LAYERED 3D CLOUD BLOB
// Atmospheric cloud-like shape
// ============================================
export function CloudBlob({ 
  className = '',
  width = 350,
  height = 200,
  animate = true,
  delay = 0,
}: {
  className?: string
  width?: number
  height?: number
  animate?: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={animate ? {
          y: [0, -12, 0],
          x: [0, 5, 0],
        } : undefined}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Back cloud layer */}
        <motion.div
          className="absolute"
          style={{
            bottom: '5%',
            left: '15%',
            width: '75%',
            height: '60%',
            borderRadius: '60% 70% 50% 60% / 50% 60% 50% 60%',
            background: 'linear-gradient(135deg, rgba(72,198,239,0.3) 0%, rgba(102,126,234,0.25) 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            filter: 'blur(1px)',
          }}
          animate={animate ? {
            scale: [1, 1.02, 1],
          } : undefined}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        {/* Middle cloud layer */}
        <motion.div
          className="absolute"
          style={{
            bottom: '15%',
            left: '5%',
            width: '70%',
            height: '65%',
            borderRadius: '50% 60% 40% 50% / 60% 50% 50% 40%',
            background: 'linear-gradient(145deg, rgba(100,150,200,0.35) 0%, rgba(150,100,200,0.25) 100%)',
            boxShadow: `
              0 8px 25px rgba(0,0,0,0.1),
              inset 0 3px 10px rgba(255,255,255,0.2)
            `,
          }}
          animate={animate ? {
            x: [0, -3, 0],
          } : undefined}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Front cloud layer */}
        <motion.div
          className="absolute"
          style={{
            bottom: '20%',
            right: '10%',
            width: '65%',
            height: '55%',
            borderRadius: '40% 50% 60% 50% / 50% 40% 50% 60%',
            background: 'linear-gradient(160deg, rgba(79,172,254,0.4) 0%, rgba(118,75,162,0.3) 100%)',
            boxShadow: `
              0 12px 35px rgba(0,0,0,0.12),
              inset 0 4px 15px rgba(255,255,255,0.25),
              inset 0 -4px 10px rgba(100,100,200,0.1)
            `,
          }}
          animate={animate ? {
            scale: [1, 0.98, 1],
            x: [0, 3, 0],
          } : undefined}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        {/* Teal glow accent */}
        <div 
          className="absolute"
          style={{
            bottom: '30%',
            left: '25%',
            width: '30%',
            height: '25%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(72,198,239,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        {/* Top highlight */}
        <div 
          className="absolute"
          style={{
            top: '25%',
            right: '25%',
            width: '25%',
            height: '15%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            filter: 'blur(3px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// EXPORT ALL SHAPES
// ============================================
export const Soft3DShapes = {
  BubbleCurve,
  PillowyRibbon,
  LiquidDrop,
  PolygonBlob,
  DualLayerOval,
  FlowingWave,
  GlassyBlob,
  HexagonCapsule,
  RoundedTriangle,
  CloudBlob,
}

export default Soft3DShapes
