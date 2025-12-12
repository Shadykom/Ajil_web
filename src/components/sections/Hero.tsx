'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  ArrowLeft, 
  ArrowRight,
  Car,
  Banknote,
  Building2,
  Sparkles,
  CheckCircle2,
  TrendingUp
} from 'lucide-react'

// AJIL "A" Shape Component - The unique brand symbol
function AjilAShape({ 
  size = 60, 
  color = 'primary',
  opacity = 0.15,
  className = '',
  animated = false,
  delay = 0
}: { 
  size?: number
  color?: 'primary' | 'secondary' | 'white'
  opacity?: number
  className?: string
  animated?: boolean
  delay?: number
}) {
  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    white: '#FFFFFF',
  }
  const mainColor = colors[color]
  const accentColor = color === 'secondary' ? '#00377B' : '#F7941D'

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ opacity }}
      initial={animated ? { scale: 0, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity } : undefined}
      transition={{ duration: 0.8, delay }}
    >
      {/* Main A shape */}
      <motion.path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke={mainColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, delay: delay + 0.2 }}
      />
      {/* A crossbar */}
      <motion.path
        d="M32 58 L68 58"
        fill="none"
        stroke={mainColor}
        strokeWidth="4"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, delay: delay + 0.8 }}
      />
      {/* Inner A accent */}
      <motion.path
        d="M35 68 L50 35 L65 68"
        fill="none"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
      />
      {/* Inner A crossbar accent */}
      <motion.path
        d="M42 52 L58 52"
        fill="none"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: delay + 1 }}
      />
    </motion.svg>
  )
}

// Floating AJIL A particle
function FloatingAShape({ 
  delay = 0, 
  size = 40, 
  color = 'primary',
  startX = 50,
  startY = 50
}: { 
  delay?: number
  size?: number 
  color?: 'primary' | 'secondary' | 'white'
  startX?: number
  startY?: number
}) {
  const colors = {
    primary: '#00377B',
    secondary: '#F7941D',
    white: '#FFFFFF',
  }
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      animate={{
        y: [-20, -60, -20],
        x: [0, 20, 0],
        rotate: [0, 10, 0],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path
          d="M20 80 L50 20 L80 80"
          fill="none"
          stroke={colors[color]}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 58 L68 58"
          fill="none"
          stroke={colors[color]}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

// Animated A Ring - rotating A shapes
function AnimatedARing({ 
  size = 300, 
  className = '',
  delay = 0 
}: { 
  size?: number
  className?: string 
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ width: size, height: size }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 300 300">
        {/* Multiple A shapes arranged in a circle */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 150 150)`}>
            <path
              d="M140 50 L150 30 L160 50"
              fill="none"
              stroke="#00377B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.2 - i * 0.02}
            />
            <path
              d="M144 45 L156 45"
              fill="none"
              stroke="#F7941D"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.15 - i * 0.01}
            />
          </g>
        ))}
        {/* Outer A ring */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="#00377B"
          strokeWidth="1"
          strokeDasharray="20 30"
          opacity="0.1"
        />
      </svg>
    </motion.div>
  )
}

// AJIL A Pattern Background
function AjilAPatternBg({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="ajil-a-pattern-calc"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* A shape */}
            <path
              d="M40 90 L60 30 L80 90"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 70 L72 70"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Inner accent */}
            <path
              d="M48 80 L60 45 L72 80"
              fill="none"
              stroke="#F7941D"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ajil-a-pattern-calc)" />
      </svg>
    </div>
  )
}

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, start])
  
  return count
}

// Stat Card Component
function StatCard({ value, suffix, label, isInView }: { value: number; suffix: string; label: string; isInView: boolean }) {
  const count = useCountUp(value, 2000, isInView)
  
  return (
    <motion.div
      className="relative group"
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
      <div className="relative p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-1">
          {count}{suffix}
        </div>
        <div className="text-sm text-white/60">{label}</div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { t, dir } = useI18n()
  const [activeTab, setActiveTab] = useState<'individuals' | 'business'>('individuals')
  const [financingType, setFinancingType] = useState('car')
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('36')
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  const calculatePayment = () => {
    setIsCalculating(true)
    setShowResult(false)
    
    setTimeout(() => {
      const principal = parseFloat(amount.replace(/,/g, ''))
      const months = parseInt(duration)
      
      if (principal && months) {
        const rate = 0.0375 / 12
        const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
        setMonthlyPayment(Math.round(payment))
        setShowResult(true)
      }
      
      setIsCalculating(false)
    }, 1200)
  }

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '')
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  const financingOptions = [
    { value: 'car', icon: Car, labelAr: 'تمويل السيارات', labelEn: 'Car Financing' },
    { value: 'cash', icon: Banknote, labelAr: 'تمويل نقدي', labelEn: 'Cash Financing' },
    { value: 'real_estate', icon: Building2, labelAr: 'تمويل عقاري', labelEn: 'Real Estate' },
  ]

  const selectedOption = financingOptions.find(opt => opt.value === financingType)
  const SelectedIcon = selectedOption?.icon || Car

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Unique AJIL Background Design */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a33] via-[#003366] to-[#001a33]" />
        
        {/* AJIL A Pattern Background */}
        <AjilAPatternBg opacity={0.04} />

        {/* Animated AJIL A gradient orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px]"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AjilAShape size={600} color="secondary" opacity={0.08} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AjilAShape size={500} color="primary" opacity={0.06} />
        </motion.div>

        {/* Animated A Rings */}
        <AnimatedARing size={400} className="top-10 -right-20" delay={0} />
        <AnimatedARing size={350} className="bottom-20 -left-20" delay={10} />

        {/* Floating A shapes */}
        <FloatingAShape delay={0} size={50} color="secondary" startX={15} startY={20} />
        <FloatingAShape delay={2} size={35} color="white" startX={80} startY={30} />
        <FloatingAShape delay={4} size={45} color="secondary" startX={25} startY={70} />
        <FloatingAShape delay={6} size={40} color="white" startX={70} startY={60} />
        <FloatingAShape delay={3} size={30} color="primary" startX={50} startY={15} />
        <FloatingAShape delay={5} size={55} color="secondary" startX={85} startY={75} />

        {/* Large decorative A shapes in corners */}
        <div className="absolute top-20 right-20 opacity-[0.08]">
          <AjilAShape size={200} color="white" animated delay={0.5} />
        </div>
        <div className="absolute bottom-32 left-16 opacity-[0.06]">
          <AjilAShape size={150} color="secondary" animated delay={0.8} />
        </div>
      </div>

      {/* Unique A-shaped divider at top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg viewBox="0 0 1440 100" className="absolute -top-1 w-full" preserveAspectRatio="none">
          {/* A-peak wave at top */}
          <path 
            d="M0,0 L1440,0 L1440,50 L1080,50 L720,10 L360,50 L0,50 Z" 
            fill="white"
          />
          {/* Inner A accent line */}
          <path 
            d="M500,48 L720,15 L940,48" 
            fill="none"
            stroke="#F7941D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content - Text and Stats */}
          <motion.div 
            className={`text-white ${dir === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge with A icon */}
            <motion.div 
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm mb-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Mini A shape icon */}
              <svg width="20" height="20" viewBox="0 0 100 100">
                <motion.path
                  d="M20 80 L50 20 L80 80"
                  fill="none"
                  stroke="#F7941D"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ pathLength: [0, 1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <motion.path
                  d="M32 58 L68 58"
                  fill="none"
                  stroke="#F7941D"
                  strokeWidth="6"
                  strokeLinecap="round"
                  animate={{ pathLength: [0, 1, 1] }}
                  transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
                />
              </svg>
              <span className="text-secondary-300 font-medium">حاسبة التمويل الذكية</span>
              <Sparkles className="w-4 h-4 text-secondary-400" />
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">احسب تمويلك</span>
              <span className="block mt-2">
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 via-secondary-300 to-secondary-400">
                    بخطوات بسيطة
                  </span>
                  {/* A-shaped underline */}
                  <svg 
                    className="absolute -bottom-3 left-0 right-0 w-full h-4"
                    viewBox="0 0 200 20"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0 18 L100 5 L200 18"
                      fill="none"
                      stroke="#F7941D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </svg>
                </span>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              استخدم حاسبتنا الذكية لمعرفة القسط الشهري المتوقع واحصل على موافقة فورية
            </motion.p>

            {/* Feature Pills with A accents */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['موافقة فورية', 'بدون كفيل', 'متوافق مع الشريعة'].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary-400" />
                  <span className="text-sm text-white/80">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Grid with A shapes */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <StatCard value={45} suffix="+" label="سنة خبرة" isInView={isInView} />
              <StatCard value={500} suffix="K+" label="عميل سعيد" isInView={isInView} />
              <StatCard value={100} suffix="%" label="متوافق شرعياً" isInView={isInView} />
            </motion.div>
          </motion.div>

          {/* Right Content - Calculator Card */}
          <motion.div 
            className={`${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Decorative A shapes behind card */}
              <motion.div 
                className="absolute -top-8 -right-8"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <AjilAShape size={100} color="secondary" opacity={0.2} />
              </motion.div>
              <motion.div 
                className="absolute -bottom-8 -left-8"
                animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <AjilAShape size={120} color="primary" opacity={0.15} />
              </motion.div>

              {/* Main Calculator Card */}
              <motion.div 
                className="relative"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* A-shaped glow effect */}
                <div className="absolute -inset-2">
                  <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M50 480 L200 20 L350 480"
                      fill="none"
                      stroke="url(#card-glow-gradient)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      opacity="0.4"
                    />
                    <linearGradient id="card-glow-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F7941D" />
                      <stop offset="50%" stopColor="#0066b3" />
                      <stop offset="100%" stopColor="#F7941D" />
                    </linearGradient>
                  </svg>
                </div>
                
                {/* Card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50 overflow-hidden">
                  {/* A-shaped header decoration */}
                  <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
                    <svg viewBox="0 0 400 10" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,10 L200,0 L400,10" fill="#0066b3" />
                      <path d="M50,10 L200,2 L350,10" fill="#F7941D" />
                    </svg>
                  </div>
                  
                  {/* Corner A decoration */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <AjilAShape size={60} color="primary" />
                  </div>

                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-8 mt-2">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* A icon in header */}
                      <svg width="28" height="28" viewBox="0 0 100 100">
                        <path
                          d="M25 75 L50 25 L75 75"
                          fill="none"
                          stroke="white"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M35 58 L65 58"
                          fill="none"
                          stroke="#F7941D"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">حاسبة التمويل</h3>
                      <p className="text-sm text-gray-500">احسب قسطك الشهري</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-6">
                    {[
                      { id: 'individuals', label: 'أفراد' },
                      { id: 'business', label: 'أعمال' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'individuals' | 'business')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 relative ${
                          activeTab === tab.id
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-md"
                            transition={{ type: 'spring', duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Financing Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      نوع التمويل
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {financingOptions.map((option) => {
                        const Icon = option.icon
                        const isSelected = financingType === option.value
                        return (
                          <motion.button
                            key={option.value}
                            onClick={() => setFinancingType(option.value)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSelected && (
                              <motion.div
                                className="absolute top-2 right-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                              </motion.div>
                            )}
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary-500' : 'text-gray-400'}`} />
                            <span className={`text-xs font-medium ${isSelected ? 'text-primary-600' : 'text-gray-500'}`}>
                              {option.labelAr}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      مبلغ التمويل
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(formatNumber(e.target.value))}
                        placeholder="أدخل المبلغ"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-bold text-xl text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-center"
                        dir="ltr"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 font-bold text-sm bg-primary-50 px-2 py-1 rounded">
                        SAR
                      </span>
                    </div>
                    {/* Quick amount buttons */}
                    <div className="flex gap-2 mt-3">
                      {['50,000', '100,000', '200,000'].map((quickAmount) => (
                        <button
                          key={quickAmount}
                          onClick={() => setAmount(quickAmount)}
                          className="flex-1 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {quickAmount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-gray-700">
                        مدة التمويل
                      </label>
                      <span className="text-lg font-bold text-primary-600">{duration} شهر</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      step="12"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      style={{
                        background: `linear-gradient(to right, #0066b3 0%, #0066b3 ${((parseInt(duration) - 12) / 48) * 100}%, #e5e7eb ${((parseInt(duration) - 12) / 48) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>12 شهر</span>
                      <span>60 شهر</span>
                    </div>
                  </div>

                  {/* Result Display */}
                  <AnimatePresence mode="wait">
                    {showResult && monthlyPayment && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="relative p-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl text-white overflow-hidden">
                          {/* A-shaped background decoration */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                            <path
                              d="M20 90 L100 20 L180 90"
                              fill="none"
                              stroke="white"
                              strokeWidth="1"
                              opacity="0.1"
                            />
                            <path
                              d="M40 80 L100 30 L160 80"
                              fill="none"
                              stroke="#F7941D"
                              strokeWidth="1"
                              opacity="0.2"
                            />
                          </svg>
                          
                          <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-secondary-300" />
                              <span className="text-sm text-white/80">القسط الشهري التقريبي</span>
                            </div>
                            <div className="text-4xl font-bold" dir="ltr">
                              {monthlyPayment.toLocaleString()}
                              <span className="text-lg mr-2">ريال</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Calculate Button with A accent */}
                  <motion.button
                    onClick={calculatePayment}
                    disabled={!amount || isCalculating}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-secondary-500 to-secondary-400 text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* A-shaped shine effect */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <svg className="h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d="M30 100 L50 0 L70 100"
                          fill="rgba(255,255,255,0.2)"
                        />
                      </svg>
                    </motion.div>
                    
                    <span className={`relative z-10 flex items-center justify-center gap-3 ${isCalculating ? 'opacity-0' : ''}`}>
                      احسب القسط الشهري
                      <ArrowIcon className="w-5 h-5" />
                    </span>
                    
                    {isCalculating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* A-shaped loading spinner */}
                        <motion.svg 
                          width="32" 
                          height="32" 
                          viewBox="0 0 100 100"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        >
                          <path
                            d="M25 75 L50 25 L75 75"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="80"
                            strokeDashoffset="20"
                          />
                        </motion.svg>
                      </div>
                    )}
                  </motion.button>

                  {/* Apply Now Link */}
                  <div className="text-center mt-6">
                    <a 
                      href="/apply" 
                      className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                    >
                      <span>تقدم بطلبك الآن</span>
                      <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom A-wave shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          {/* A-peak wave pattern */}
          <path 
            d="M0,100 L0,70 L240,70 L360,30 L480,70 L720,70 L840,30 L960,70 L1200,70 L1320,30 L1440,70 L1440,100 Z" 
            fill="white"
          />
          {/* Inner accent peaks */}
          <path 
            d="M320,68 L360,35 L400,68 M800,68 L840,35 L880,68 M1280,68 L1320,35 L1360,68" 
            fill="none"
            stroke="#F7941D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  )
}
