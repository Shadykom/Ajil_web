'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Gift,
  Bell,
  Shield
} from 'lucide-react'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3, filled = false }: { size?: number; color?: string; strokeWidth?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M20 80 L50 20 L80 80"
        fill={filled ? `${color}15` : 'none'}
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

// Floating envelope with A
function FloatingEnvelope({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute"
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        delay,
        ease: 'easeInOut'
      }}
    >
      <div className="relative">
        <Mail className="w-8 h-8 text-white/20" />
        <div className="absolute -top-1 -right-1">
          <MiniAShape size={12} color={AJIL_GOLD} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Newsletter() {
  const { t, dir, language } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStatus('success')
      setMessage(language === 'ar' ? 'تم الاشتراك بنجاح! شكراً لك' : 'Successfully subscribed! Thank you')
      setEmail('')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(language === 'ar' ? 'حدث خطأ. حاول مرة أخرى' : 'An error occurred. Please try again')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  const benefits = [
    { icon: Gift, labelAr: 'عروض حصرية', labelEn: 'Exclusive Offers' },
    { icon: Bell, labelAr: 'آخر الأخبار', labelEn: 'Latest News' },
    { icon: Shield, labelAr: 'نصائح مالية', labelEn: 'Financial Tips' },
  ]

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
          className="absolute -top-10 -right-10"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShape size={350} opacity={0.04} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-10 -left-10"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <LargeAShape size={300} opacity={0.03} />
        </motion.div>

        {/* Center large A */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LargeAShape size={500} opacity={0.02} />
        </div>

        {/* Floating envelopes */}
        <div className="absolute top-20 left-[10%]">
          <FloatingEnvelope delay={0} />
        </div>
        <div className="absolute top-32 right-[15%]">
          <FloatingEnvelope delay={2} />
        </div>
        <div className="absolute bottom-24 left-[20%]">
          <FloatingEnvelope delay={1} />
        </div>
        <div className="absolute bottom-32 right-[10%]">
          <FloatingEnvelope delay={3} />
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}15 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE_LIGHT}20 0%, transparent 70%)` }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating A shapes */}
        {[
          { x: 5, y: 40, delay: 0, size: 30 },
          { x: 92, y: 35, delay: 1, size: 25 },
          { x: 15, y: 75, delay: 2, size: 35 },
          { x: 85, y: 70, delay: 3, size: 28 },
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
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Card */}
          <div 
            className="relative rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: `0 25px 80px ${AJIL_BLUE}50`
            }}
          >
            {/* Card background A shapes */}
            <div className="absolute top-6 right-6 opacity-10">
              <MiniAShape size={100} color="white" strokeWidth={1.5} />
            </div>
            <div className="absolute bottom-6 left-6 opacity-10">
              <MiniAShape size={80} color={AJIL_GOLD} strokeWidth={1.5} />
            </div>

            {/* A-shaped top accent */}
            <div className="absolute top-0 left-0 right-0">
              <svg viewBox="0 0 600 20" className="w-full" preserveAspectRatio="none">
                <path d="M0,0 L600,0 L600,10 L400,10 L300,0 L200,10 L0,10 Z" fill={AJIL_GOLD} opacity="0.3" />
              </svg>
            </div>

            <div className="text-center relative">
              {/* Icon with A shape frame */}
              <motion.div
                className="relative w-24 h-24 mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              >
                {/* A-shaped background */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path
                    d="M15 85 L50 15 L85 85 Z"
                    fill={`${AJIL_GOLD}20`}
                  />
                  <path
                    d="M15 85 L50 15 L85 85"
                    fill="none"
                    stroke={AJIL_GOLD}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <motion.path
                    d="M30 60 L70 60"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                
                {/* Floating sparkle */}
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: AJIL_GOLD }}
                  >
                    <Sparkles className="w-4 h-4 text-gray-900" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MiniAShape size={14} color={AJIL_GOLD} strokeWidth={2} />
                <span>{language === 'ar' ? 'ابق على اطلاع' : 'Stay Updated'}</span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {language === 'ar' ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
              </motion.h2>

              {/* A-shaped underline */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg width="150" height="20" viewBox="0 0 150 20">
                  <path
                    d="M0 15 L75 5 L150 15"
                    fill="none"
                    stroke={AJIL_GOLD}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-white/70 mb-10 text-lg max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {language === 'ar' 
                  ? 'احصل على آخر العروض والأخبار الحصرية والنصائح المالية مباشرة في بريدك الإلكتروني'
                  : 'Get the latest exclusive offers, news, and financial tips directly in your inbox'}
              </motion.p>

              {/* Benefits */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${AJIL_GOLD}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: AJIL_GOLD }} />
                      </div>
                      <span className="text-sm font-medium text-white/80">
                        {language === 'ar' ? benefit.labelAr : benefit.labelEn}
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Form */}
              <motion.form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex-1 relative group">
                  {/* Input glow */}
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${AJIL_GOLD}40, ${AJIL_BLUE_LIGHT}40)` }}
                  />
                  
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-medium text-white placeholder-white/40 focus:outline-none focus:border-[#F7941D] transition-all duration-300"
                      style={{ 
                        boxShadow: status === 'error' ? `0 0 0 2px rgba(239,68,68,0.5)` : 'none'
                      }}
                      disabled={status === 'loading' || status === 'success'}
                    />
                    
                    {/* Status icons */}
                    {status === 'success' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`}
                      >
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`}
                      >
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="relative px-8 py-4 rounded-xl font-bold text-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                  style={{ 
                    backgroundColor: AJIL_GOLD,
                    boxShadow: `0 10px 30px ${AJIL_GOLD}40`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* A-shape shine effect */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <svg className="h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M30 100 L50 0 L70 100"
                        fill="rgba(255,255,255,0.3)"
                      />
                    </svg>
                  </motion.div>
                  
                  <span className={`relative z-10 flex items-center justify-center gap-2 text-gray-900 ${status === 'loading' ? 'opacity-0' : ''}`}>
                    <MiniAShape size={18} color="rgba(0,0,0,0.2)" strokeWidth={2} />
                    <span>{language === 'ar' ? 'اشترك الآن' : 'Subscribe'}</span>
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Loading spinner with A shape */}
                  {status === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 100 100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      >
                        <path
                          d="M25 75 L50 25 L75 75"
                          fill="none"
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="80"
                          strokeDashoffset="20"
                        />
                      </motion.svg>
                    </div>
                  )}
                </motion.button>
              </motion.form>

              {/* Status Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 font-semibold ${
                    status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {message}
                </motion.p>
              )}

              {/* Trust Badges */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/50"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  {language === 'ar' ? 'بدون بريد مزعج' : 'No Spam'}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  {language === 'ar' ? 'إلغاء الاشتراك في أي وقت' : 'Unsubscribe Anytime'}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${AJIL_GOLD}20` }}>
                    <MiniAShape size={10} color={AJIL_GOLD} strokeWidth={2} />
                  </div>
                  {language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers'}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom A-Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,60 L0,30 Q360,60 720,20 Q1080,60 1440,30 L1440,60 Z" 
            fill="white"
          />
          <path 
            d="M580,38 L720,15 L860,38" 
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
