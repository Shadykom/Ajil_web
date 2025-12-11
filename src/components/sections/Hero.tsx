'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  ArrowLeft, 
  ArrowRight,
} from 'lucide-react'
import {
  AnimatedSecurity,
  AnimatedLoanCalculator,
  AnimatedAjilSymbol,
} from '@/components/icons/AnimatedIcons'
import { AjilLogoBackground } from '@/components/icons/AjilLogo'
import { 
  BubbleCurve, 
  LiquidDrop, 
  GlassyBlob, 
  FlowingWave,
  CloudBlob,
} from '@/components/decorative/Soft3DShapes'

// Particle component for background effect
function Particle({ delay = 0 }: { delay?: number }) {
  const [isMounted, setIsMounted] = useState(false)
  const randomX = useRef(Math.random() * 100).current
  const randomSize = useRef(Math.random() * 6 + 2).current
  const randomDuration = useRef(Math.random() * 10 + 15).current

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      className="absolute rounded-full bg-white/10"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: -20,
      }}
      animate={{
        y: [0, typeof window !== 'undefined' ? -window.innerHeight : -800],
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
    />
  )
}

// Floating shape component
function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const { t, language, dir } = useI18n()
  const [activeTab, setActiveTab] = useState<'individuals' | 'business'>('individuals')
  const [financingType, setFinancingType] = useState('car')
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('36')
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const calculatePayment = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for animation
    setTimeout(() => {
      const principal = parseFloat(amount.replace(/,/g, ''))
      const months = parseInt(duration)
      
      if (principal && months) {
        // Simplified calculation (actual formula would use proper financing rates)
        const rate = 0.0375 / 12 // Approximate monthly rate
        const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
        setMonthlyPayment(Math.round(payment))
      }
      
      setIsCalculating(false)
    }, 800)
  }

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '')
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] bg-hero-gradient overflow-hidden flex items-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(247,148,29,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,102,179,0.2)_0%,transparent_50%)]" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating Shapes */}
        <FloatingShape 
          className="w-72 h-72 bg-gradient-radial from-secondary-500/20 to-transparent top-10 left-[5%]"
        />
        <FloatingShape 
          className="w-48 h-48 bg-gradient-radial from-primary-400/20 to-transparent bottom-20 right-[10%]"
          delay={2}
        />
        <FloatingShape 
          className="w-32 h-32 bg-gradient-radial from-white/10 to-transparent top-1/2 left-1/3"
          delay={1}
        />

        {/* Soft 3D Decorative Shapes */}
        <BubbleCurve 
          className="top-[5%] right-[8%] opacity-30"
          size={180}
          delay={0.3}
        />
        <LiquidDrop 
          className="bottom-[15%] left-[3%] opacity-25"
          size={120}
          delay={0.5}
        />
        <GlassyBlob 
          className="top-[30%] right-[2%] opacity-20"
          size={200}
          delay={0.7}
        />
        <CloudBlob 
          className="bottom-[5%] right-[15%] opacity-15"
          width={250}
          height={140}
          delay={1}
        />
        <FlowingWave 
          className="-bottom-10 left-0 opacity-20"
          width={600}
          height={150}
          delay={0.4}
        />

        {/* AJIL Logo Background Decorations */}
        <div className="absolute -top-20 -right-20 opacity-[0.03]">
          <AjilLogoBackground size={500} animated />
        </div>
        <div className="absolute -bottom-32 -left-32 opacity-[0.02] rotate-180">
          <AjilLogoBackground size={400} animated />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} delay={i * 0.5} />
          ))}
        </div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <motion.div 
        className="container mx-auto px-4 py-20 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text Content */}
          <motion.div 
            className="text-white order-2 lg:order-1"
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm text-secondary-400 mb-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedSecurity size={20} delay={0.5} />
              <span className="font-medium">{t('hero.badge')}</span>
              <AnimatedAjilSymbol size={16} delay={0.7} />
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('hero.title')}{' '}
              <span className="relative inline-block">
                <span className="text-secondary-400">{t('hero.title_highlight')}</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <motion.path
                    d="M2 8 Q 50 2, 100 8 T 198 6"
                    stroke="#f7941d"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="/apply"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-secondary-500 to-secondary-400 text-white px-8 py-4 rounded-xl font-bold text-lg overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t('hero.cta_primary')}</span>
                <ArrowIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 shimmer" />
              </motion.a>

              <motion.a
                href="#services"
                className="group inline-flex items-center gap-3 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t('hero.cta_secondary')}</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400">+45</div>
                <div className="text-sm text-white/60">{t('stats.years')}</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400">+500K</div>
                <div className="text-sm text-white/60">{t('stats.customers')}</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400">100%</div>
                <div className="text-sm text-white/60">{t('stats.shariah')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Calculator Card */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative w-full max-w-md"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-3xl blur-2xl opacity-50" />
              
              {/* Card */}
              <div className="relative glass-white rounded-3xl p-8 shadow-2xl">
                {/* Card Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <AnimatedLoanCalculator size={20} className="text-white" delay={0.3} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-600">
                    {t('hero.calculator_title')}
                  </h3>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-xl p-1.5 mb-6">
                  <button
                    onClick={() => setActiveTab('individuals')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeTab === 'individuals'
                        ? 'bg-white text-primary-600 shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('hero.tab_individuals')}
                  </button>
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeTab === 'business'
                        ? 'bg-white text-primary-600 shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('hero.tab_business')}
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Financing Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('hero.financing_type')}
                    </label>
                    <select
                      value={financingType}
                      onChange={(e) => setFinancingType(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: dir === 'rtl' ? '12px center' : 'calc(100% - 12px) center',
                      }}
                    >
                      <option value="car">{t('hero.financing_type_car')}</option>
                      <option value="cash">{t('hero.financing_type_cash')}</option>
                      <option value="real_estate">{t('hero.financing_type_real_estate')}</option>
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('hero.financing_amount')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(formatNumber(e.target.value))}
                        placeholder={t('hero.financing_amount_placeholder')}
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300"
                        dir="ltr"
                      />
                      <span className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 font-medium`}>
                        SAR
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('hero.financing_duration')}
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: dir === 'rtl' ? '12px center' : 'calc(100% - 12px) center',
                      }}
                    >
                      <option value="12">12 {t('hero.months')}</option>
                      <option value="24">24 {t('hero.months')}</option>
                      <option value="36">36 {t('hero.months')}</option>
                      <option value="48">48 {t('hero.months')}</option>
                      <option value="60">60 {t('hero.months')}</option>
                    </select>
                  </div>

                  {/* Result Display */}
                  {monthlyPayment && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100"
                    >
                      <p className="text-sm text-gray-600 mb-1">القسط الشهري التقريبي</p>
                      <p className="text-3xl font-bold text-primary-600" dir="ltr">
                        {monthlyPayment.toLocaleString()} <span className="text-lg">SAR</span>
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    onClick={calculatePayment}
                    disabled={!amount || isCalculating}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl font-bold text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={`relative z-10 flex items-center justify-center gap-2 ${isCalculating ? 'opacity-0' : ''}`}>
                      {t('hero.calculate_btn')}
                    </span>
                    {isCalculating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [1, 0], y: [0, 10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
