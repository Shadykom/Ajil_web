'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
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

// Large A Shape for background
function LargeAShape({ size = 200, opacity = 0.05 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <path
        d="M10 90 L50 10 L90 90"
        fill="none"
        stroke="white"
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

interface PageHeroProps {
  title: string
  titleAr: string
  subtitle?: string
  subtitleAr?: string
  badge?: string
  badgeAr?: string
  BadgeIcon?: React.ComponentType<{ size?: number | string; className?: string }>
  backgroundVariant?: 'primary' | 'secondary' | 'gradient'
  children?: ReactNode
}

export default function PageHero({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  badge,
  badgeAr,
  BadgeIcon,
  backgroundVariant = 'gradient',
  children,
}: PageHeroProps) {
  const { language, dir } = useI18n()

  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: AJIL_BLUE }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating A shapes */}
        <motion.div 
          className="absolute -top-20 -right-20"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShape size={400} opacity={0.04} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-20 -left-20"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <LargeAShape size={350} opacity={0.03} />
        </motion.div>

        {/* Floating A shapes */}
        {[
          { x: 10, y: 20, size: 40, delay: 0 },
          { x: 85, y: 30, size: 30, delay: 1 },
          { x: 15, y: 70, size: 35, delay: 2 },
          { x: 90, y: 75, size: 45, delay: 3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 6 + i, 
              repeat: Infinity, 
              delay: item.delay,
              ease: 'easeInOut'
            }}
          >
            <MiniAShape size={item.size} color="white" strokeWidth={1.5} />
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}15 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE_LIGHT}20 0%, transparent 70%)` }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center text-white max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with A shape */}
          {(badge || badgeAr) && (
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm mb-6"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
              {BadgeIcon && <BadgeIcon size={18} className="text-white/80" />}
              <span className="font-medium" style={{ color: AJIL_GOLD }}>
                {language === 'ar' ? badgeAr : badge}
              </span>
              <Sparkles className="w-4 h-4" style={{ color: AJIL_GOLD }} />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'ar' ? titleAr : title}
          </motion.h1>

          {/* A-shaped underline */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg width="180" height="20" viewBox="0 0 180 20">
              <motion.path
                d="M0 18 L90 4 L180 18"
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.path
                d="M40 16 L90 6 L140 16"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </svg>
          </motion.div>

          {/* Subtitle */}
          {(subtitle || subtitleAr) && (
            <motion.p 
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {language === 'ar' ? subtitleAr : subtitle}
            </motion.p>
          )}

          {/* Custom Children Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom A-Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,80 L0,50 Q360,80 720,30 Q1080,80 1440,50 L1440,80 Z" 
            fill="white"
          />
          <path 
            d="M560,55 L720,25 L880,55" 
            fill="none"
            stroke={AJIL_GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
