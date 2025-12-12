'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// AJIL Brand Colors
export const AJIL_BLUE = '#00377B'
export const AJIL_BLUE_LIGHT = '#0066b3'
export const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
export function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3, className = '' }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 60 L68 60"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Large A Shape for backgrounds
export function LargeAShape({ size = 200, opacity = 0.05, color = AJIL_BLUE }: { size?: number; opacity?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <path
        d="M10 90 L50 10 L90 90"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 65 L75 65"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Section with A-shape background
export function AShapeSection({ 
  children, 
  className = '',
  background = 'white'
}: { 
  children: ReactNode
  className?: string 
  background?: 'white' | 'gray' | 'blue'
}) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: `bg-[${AJIL_BLUE}]`
  }

  return (
    <section className={`relative py-20 overflow-hidden ${bgStyles[background]} ${className}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-10 -right-10"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <LargeAShape size={200} opacity={0.03} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-10 -left-10"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShape size={180} opacity={0.02} />
        </motion.div>

        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE}08 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}08 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

// Card with A-shape styling
export function AShapeCard({ 
  children, 
  className = '',
  hover = true
}: { 
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ 
        background: 'white',
        boxShadow: `0 10px 40px ${AJIL_BLUE}08`,
        border: '1px solid rgba(0,55,123,0.05)'
      }}
      whileHover={hover ? { y: -5, boxShadow: `0 20px 50px ${AJIL_BLUE}12` } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Top A accent */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <svg viewBox="0 0 400 10" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,10 L200,0 L400,10" fill={AJIL_GOLD} opacity="0.5" />
        </svg>
      </div>

      {/* Background A decoration */}
      <div className="absolute top-4 right-4 opacity-[0.03]">
        <MiniAShape size={60} color={AJIL_BLUE} strokeWidth={1.5} />
      </div>

      {children}
    </motion.div>
  )
}

// Button with A-shape styling
export function AShapeButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: { 
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  [key: string]: any
}) {
  const variants = {
    primary: {
      bg: AJIL_GOLD,
      text: '#1a1a1a',
      shadow: `0 10px 30px ${AJIL_GOLD}40`
    },
    secondary: {
      bg: AJIL_BLUE,
      text: 'white',
      shadow: `0 10px 30px ${AJIL_BLUE}30`
    },
    outline: {
      bg: 'transparent',
      text: AJIL_BLUE,
      shadow: 'none'
    }
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const style = variants[variant]

  return (
    <motion.button
      className={`relative inline-flex items-center justify-center gap-2 font-bold rounded-xl overflow-hidden transition-all ${sizes[size]} ${className}`}
      style={{ 
        backgroundColor: style.bg,
        color: style.text,
        boxShadow: style.shadow,
        border: variant === 'outline' ? `2px solid ${AJIL_BLUE}` : 'none'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6 }}
      >
        <svg className="h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M30 100 L50 0 L70 100" fill="rgba(255,255,255,0.2)" />
        </svg>
      </motion.div>

      <MiniAShape size={16} color={variant === 'primary' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'} strokeWidth={2} />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Section Header with A-shape
export function SectionHeader({ 
  badge,
  badgeAr,
  title,
  titleAr,
  subtitle,
  subtitleAr,
  language = 'en',
  centered = true
}: { 
  badge?: string
  badgeAr?: string
  title: string
  titleAr: string
  subtitle?: string
  subtitleAr?: string
  language?: string
  centered?: boolean
}) {
  return (
    <div className={`${centered ? 'text-center max-w-3xl mx-auto' : ''} mb-12`}>
      {(badge || badgeAr) && (
        <motion.div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${centered ? '' : ''}`}
          style={{ backgroundColor: `${AJIL_BLUE}08`, color: AJIL_BLUE }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
          <span>{language === 'ar' ? badgeAr : badge}</span>
        </motion.div>
      )}

      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
          style={{ color: AJIL_BLUE }}
        >
          {language === 'ar' ? titleAr : title}
        </h2>
        {/* A-shaped underline */}
        <svg 
          className={`absolute -bottom-2 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-32 h-4`}
          viewBox="0 0 120 15"
        >
          <motion.path
            d="M0 12 L60 3 L120 12"
            fill="none"
            stroke={AJIL_GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      {(subtitle || subtitleAr) && (
        <motion.p 
          className="text-gray-500 mt-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {language === 'ar' ? subtitleAr : subtitle}
        </motion.p>
      )}
    </div>
  )
}

// Input with A-shape focus styling
export function AShapeInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  dir,
  className = ''
}: {
  label?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  dir?: string
  className?: string
}) {
  return (
    <div className={className}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: AJIL_BLUE }}>
          <MiniAShape size={12} color={AJIL_GOLD} strokeWidth={2} />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        <div 
          className="absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${AJIL_GOLD}40, ${AJIL_BLUE}40)` }}
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          dir={dir}
          className="relative w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all"
          style={{ outline: 'none' }}
        />
      </div>
    </div>
  )
}

// CTA Section with A-shape design
export function AShapeCTA({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  buttonText,
  buttonTextAr,
  buttonHref,
  language = 'en'
}: {
  title: string
  titleAr: string
  subtitle?: string
  subtitleAr?: string
  buttonText: string
  buttonTextAr: string
  buttonHref: string
  language?: string
}) {
  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: AJIL_BLUE }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute -top-10 -right-10"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShape size={300} opacity={0.05} color="white" />
        </motion.div>
        
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}15 0%, transparent 70%)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {language === 'ar' ? titleAr : title}
          </h2>
          
          {/* A-shaped underline */}
          <div className="flex justify-center mb-6">
            <svg width="150" height="20" viewBox="0 0 150 20">
              <motion.path
                d="M0 15 L75 5 L150 15"
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </div>

          {(subtitle || subtitleAr) && (
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {language === 'ar' ? subtitleAr : subtitle}
            </p>
          )}

          <a href={buttonHref}>
            <AShapeButton variant="primary" size="lg">
              {language === 'ar' ? buttonTextAr : buttonText}
            </AShapeButton>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
