'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Apple,
  Smartphone,
  Sparkles,
  QrCode,
  Star,
  Shield,
  Zap,
  Bell
} from 'lucide-react'

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
function LargeAShape({ size = 200, opacity = 0.05, color = 'white' }: { size?: number; opacity?: number; color?: string }) {
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

const features = [
  { 
    key: 'quick_apply', 
    icon: Zap, 
    labelAr: 'تقديم سريع',
    labelEn: 'Quick Apply',
    delay: 0 
  },
  { 
    key: 'notifications', 
    icon: Bell, 
    labelAr: 'إشعارات فورية',
    labelEn: 'Instant Alerts',
    delay: 0.1 
  },
  { 
    key: 'security', 
    icon: Shield, 
    labelAr: 'أمان عالي',
    labelEn: 'High Security',
    delay: 0.2 
  },
  { 
    key: 'support', 
    icon: Star, 
    labelAr: 'دعم متواصل',
    labelEn: '24/7 Support',
    delay: 0.3 
  },
]

export default function AppDownload() {
  const { t, dir, language } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: AJIL_BLUE }}
    >
      {/* Top A-Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,0 L0,50 Q360,80 720,30 Q1080,80 1440,50 L1440,0 Z" 
            fill="white"
          />
          <path 
            d="M560,48 L720,20 L880,48" 
            fill="none"
            stroke={AJIL_GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large A shapes */}
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

        {/* Center large A */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <LargeAShape size={600} opacity={1} />
        </div>

        {/* Floating A shapes */}
        {[
          { x: 5, y: 30, size: 35, delay: 0 },
          { x: 92, y: 25, size: 28, delay: 1 },
          { x: 10, y: 75, size: 40, delay: 2 },
          { x: 88, y: 70, size: 32, delay: 3 },
          { x: 50, y: 15, size: 25, delay: 1.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.03, 0.08, 0.03]
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
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}15 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE_LIGHT}20 0%, transparent 70%)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            className={`${dir === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold mb-6"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
              <Smartphone className="w-4 h-4 text-white/80" />
              <span style={{ color: AJIL_GOLD }}>
                {language === 'ar' ? 'تطبيق الجوال' : 'Mobile App'}
              </span>
              <Sparkles className="w-4 h-4" style={{ color: AJIL_GOLD }} />
            </motion.div>

            {/* Title */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar' ? 'حمّل تطبيقنا الآن' : 'Download Our App'}
            </motion.h2>

            {/* A-shaped underline */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <svg width="180" height="20" viewBox="0 0 180 20">
                <motion.path
                  d="M0 18 L90 4 L180 18"
                  fill="none"
                  stroke={AJIL_GOLD}
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="text-lg text-white/70 leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {language === 'ar' 
                ? 'استمتع بتجربة تمويل سلسة وسهلة من خلال تطبيقنا. قدم طلبك واحصل على موافقة فورية من أي مكان'
                : 'Enjoy a seamless financing experience through our app. Apply and get instant approval from anywhere'}
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative p-4 rounded-2xl overflow-hidden"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Hover fill */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    />
                    
                    {/* Background A */}
                    <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <MiniAShape size={30} color="white" strokeWidth={1} />
                    </div>

                    <div className="relative flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{ backgroundColor: `${AJIL_GOLD}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: AJIL_GOLD }} />
                      </div>
                      <span className="text-sm font-bold text-white">
                        {language === 'ar' ? feature.labelAr : feature.labelEn}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* App Store Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <motion.a
                href="#"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl overflow-hidden"
                style={{ 
                  backgroundColor: 'white',
                  boxShadow: `0 10px 40px ${AJIL_BLUE}30`
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* A shape decoration */}
                <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MiniAShape size={40} color={AJIL_BLUE} strokeWidth={1} />
                </div>
                
                <Apple className="w-8 h-8" style={{ color: AJIL_BLUE }} />
                <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-500">
                    {language === 'ar' ? 'حمّل من' : 'Download on'}
                  </p>
                  <p className="text-lg font-bold" style={{ color: AJIL_BLUE }}>App Store</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl overflow-hidden"
                style={{ 
                  backgroundColor: AJIL_GOLD,
                  boxShadow: `0 10px 40px ${AJIL_GOLD}40`
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* A shape decoration */}
                <div className="absolute top-2 right-2 opacity-10">
                  <MiniAShape size={40} color="rgba(0,0,0,0.2)" strokeWidth={1} />
                </div>
                
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#1a1a1a"/>
                  <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#1a1a1a"/>
                  <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z" fill="#1a1a1a"/>
                  <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="#1a1a1a"/>
                </svg>
                <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-800/70">
                    {language === 'ar' ? 'احصل عليه من' : 'Get it on'}
                  </p>
                  <p className="text-lg font-bold text-gray-900">Google Play</p>
                </div>
              </motion.a>
            </motion.div>

            {/* QR Code hint */}
            <motion.div 
              className="flex items-center gap-3 mt-6 text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <QrCode className="w-5 h-5" />
              <span>{language === 'ar' ? 'أو امسح رمز QR للتحميل السريع' : 'Or scan QR code for quick download'}</span>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div 
            className={`${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div 
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${AJIL_GOLD}30 0%, transparent 70%)` }}
              />
              
              {/* Large A shape behind phone */}
              <motion.div 
                className="absolute -inset-20 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
              >
                <LargeAShape size={400} opacity={0.08} />
              </motion.div>
              
              {/* Phone Frame */}
              <motion.div 
                className="relative w-72 md:w-80"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Phone body */}
                <div 
                  className="relative rounded-[3rem] p-3 shadow-2xl"
                  style={{ 
                    background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
                    boxShadow: `0 50px 100px ${AJIL_BLUE}50`
                  }}
                >
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                  
                  {/* Screen */}
                  <div 
                    className="relative rounded-[2.5rem] overflow-hidden aspect-[9/19]"
                    style={{ background: `linear-gradient(180deg, ${AJIL_BLUE} 0%, ${AJIL_BLUE_LIGHT} 100%)` }}
                  >
                    {/* App Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      {/* Animated A shape */}
                      <motion.div
                        className="mb-4"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <MiniAShape size={60} color={AJIL_GOLD} strokeWidth={2} />
                      </motion.div>
                      
                      {/* Logo */}
                      <motion.div
                        className="mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Image
                          src="/images/AJIL_logo.png"
                          alt="AJIL Finance"
                          width={140}
                          height={50}
                          className="object-contain drop-shadow-lg"
                        />
                      </motion.div>
                      
                      {/* Tagline */}
                      <p className="text-sm text-white/70 text-center mb-6">
                        {language === 'ar' ? 'تمويلك بين يديك' : 'Financing at your fingertips'}
                      </p>

                      {/* Animated A-shaped loading */}
                      <div className="relative w-16 h-16 mb-4">
                        <motion.svg 
                          viewBox="0 0 100 100" 
                          className="w-full h-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.1)" 
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M30 70 L50 30 L70 70"
                            fill="none"
                            stroke={AJIL_GOLD}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.svg>
                      </div>

                      {/* Loading dots */}
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: AJIL_GOLD }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Decorative A shapes inside phone */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                      style={{ background: `radial-gradient(circle, ${AJIL_GOLD}20 0%, transparent 70%)` }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="absolute top-8 left-8 opacity-10">
                      <MiniAShape size={30} color="white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Reflection */}
                <div 
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full blur-xl"
                  style={{ backgroundColor: `${AJIL_BLUE}40` }}
                />
              </motion.div>

              {/* Floating badges with A shapes */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ 
                  backgroundColor: AJIL_GOLD,
                  boxShadow: `0 10px 30px ${AJIL_GOLD}50`
                }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MiniAShape size={32} color="rgba(0,0,0,0.3)" strokeWidth={2} />
              </motion.div>

              <motion.div
                className="absolute bottom-24 -left-8 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl"
                style={{ 
                  backgroundColor: 'white',
                  boxShadow: `0 10px 30px ${AJIL_BLUE}30`
                }}
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <Shield className="w-7 h-7" style={{ color: AJIL_BLUE }} />
              </motion.div>

              <motion.div
                className="absolute top-1/3 -right-6 w-12 h-12 rounded-lg flex items-center justify-center shadow-xl"
                style={{ 
                  backgroundColor: 'white',
                  boxShadow: `0 10px 30px ${AJIL_BLUE}30`
                }}
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Zap className="w-6 h-6" style={{ color: AJIL_GOLD }} />
              </motion.div>

              {/* QR Code */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-20 h-20 rounded-2xl p-2 shadow-xl"
                style={{ backgroundColor: 'white' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AJIL_BLUE}10` }}>
                  <QrCode className="w-10 h-10" style={{ color: AJIL_BLUE }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom A-Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,60 L0,30 Q360,60 720,15 Q1080,60 1440,30 L1440,60 Z" 
            fill="white"
          />
          <path 
            d="M580,38 L720,12 L860,38" 
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
