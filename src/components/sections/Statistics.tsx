'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { AjilSymbol } from '@/components/icons'

interface StatItem {
  value: number
  suffix: string
  prefix?: string
  labelKey: string
  delay: number
}

const stats: StatItem[] = [
  { value: 45, prefix: '+', suffix: '', labelKey: 'stats.years', delay: 0 },
  { value: 500, prefix: '+', suffix: 'K', labelKey: 'stats.customers', delay: 0.1 },
  { value: 50, prefix: '+', suffix: '', labelKey: 'stats.branches', delay: 0.2 },
  { value: 100, suffix: '%', labelKey: 'stats.shariah', delay: 0.3 },
]

function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2000,
  startAnimation 
}: { 
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  startAnimation: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(value * easeOutQuart)
      
      setCount(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [startAnimation, value, duration])

  return (
    <span className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

function StatCard({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: stat.delay }}
      className="relative text-center group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative">
        {/* Number */}
        <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 flex items-center justify-center">
          <span className="text-secondary-400">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              startAnimation={isVisible}
            />
          </span>
        </div>
        
        {/* Label */}
        <div className="text-white/70 text-base md:text-lg font-medium">
          {t(stat.labelKey)}
        </div>
      </div>

      {/* Decorative Line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: stat.delay + 0.3 }}
      />
    </motion.div>
  )
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-white/5 -top-48 -left-48"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-secondary-500/10 -bottom-32 -right-32"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Floating AJIL Symbols */}
      <motion.div
        className="absolute top-16 left-[10%] text-white/10"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AjilSymbol size={80} />
      </motion.div>
      <motion.div
        className="absolute bottom-16 right-[15%] text-white/10"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <AjilSymbol size={60} />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatCard 
              key={stat.labelKey}
              stat={stat}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z" 
            fill="white"
            opacity="0.1"
          />
          <path 
            d="M0,100 C480,60 960,140 1440,100 L1440,120 L0,120 Z" 
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>
  )
}
