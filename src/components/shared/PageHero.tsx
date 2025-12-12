'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { AjilLogoBackground } from '@/components/icons/AjilLogo'
import { ReactNode } from 'react'

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
  
  const bgClasses = {
    primary: 'bg-primary-gradient',
    secondary: 'bg-secondary-gradient',
    gradient: 'bg-hero-gradient',
  }

  return (
    <section className={`relative ${bgClasses[backgroundVariant]} py-20 md:py-32 overflow-hidden`}>
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(247,148,29,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,102,179,0.2)_0%,transparent_50%)]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* AJIL Logo Decorations */}
        <div className="absolute -top-20 -right-20 opacity-[0.03]">
          <AjilLogoBackground size={400} animated />
        </div>
        <div className="absolute -bottom-32 -left-32 opacity-[0.02] rotate-180">
          <AjilLogoBackground size={300} animated />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center text-white max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          {(badge || badgeAr) && (
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm text-secondary-400 mb-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {BadgeIcon && <BadgeIcon size={18} className="text-secondary-400" />}
              <span className="font-medium">{language === 'ar' ? badgeAr : badge}</span>
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

          {/* Subtitle */}
          {(subtitle || subtitleAr) && (
            <motion.p 
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {language === 'ar' ? subtitleAr : subtitle}
            </motion.p>
          )}

          {/* Custom Children Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
