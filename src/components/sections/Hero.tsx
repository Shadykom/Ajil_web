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

// Animated floating particles
function FloatingParticle({ delay = 0, size = 4, color = 'primary' }: { delay?: number; size?: number; color?: string }) {
  const colorClass = color === 'primary' ? 'bg-primary-400' : 'bg-secondary-400'
  return (
    <motion.div
      className={`absolute rounded-full ${colorClass} opacity-20`}
      style={{ width: size, height: size }}
      animate={{
        y: [-20, -100, -20],
        x: [0, 30, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// Animated ring component
function AnimatedRing({ size, delay = 0, className = '' }: { size: number; delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full border-2 border-primary-200/30 ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
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
      {/* Unique Background Design */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a33] via-[#003366] to-[#001a33]" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(247,148,29,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,102,179,0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated rings */}
        <AnimatedRing size={400} className="top-20 -right-20" delay={0} />
        <AnimatedRing size={300} className="bottom-10 -left-10" delay={5} />
        <AnimatedRing size={200} className="top-1/2 left-1/4" delay={10} />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4">
          <FloatingParticle delay={0} size={6} color="secondary" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <FloatingParticle delay={2} size={8} color="primary" />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <FloatingParticle delay={4} size={5} color="secondary" />
        </div>
        <div className="absolute bottom-1/3 right-1/3">
          <FloatingParticle delay={6} size={7} color="primary" />
        </div>
      </div>

      {/* Unique shaped divider at top */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg viewBox="0 0 1440 80" className="absolute -top-1 w-full" preserveAspectRatio="none">
          <path 
            d="M0,0 L1440,0 L1440,40 Q1080,80 720,40 Q360,0 0,40 Z" 
            fill="white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content - Text and Stats */}
          <motion.div 
            className={`text-white ${dir === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm mb-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-secondary-400" />
              </motion.div>
              <span className="text-secondary-300 font-medium">حاسبة التمويل الذكية</span>
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
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-secondary-500 to-secondary-300 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
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

            {/* Feature Pills */}
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

            {/* Stats Grid */}
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
              {/* Decorative elements behind card */}
              <motion.div 
                className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary-400/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Main Calculator Card */}
              <motion.div 
                className="relative"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary-500/50 via-primary-400/50 to-secondary-500/50 rounded-[2rem] blur-xl opacity-50" />
                
                {/* Card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50 overflow-hidden">
                  {/* Card header decoration */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
                  
                  {/* Corner decorations */}
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-5">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary-600">
                      <polygon points="100,0 100,100 0,100" />
                    </svg>
                  </div>

                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <SelectedIcon className="w-7 h-7 text-white" />
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
                          {/* Background decoration */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                          
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

                  {/* Calculate Button */}
                  <motion.button
                    onClick={calculatePayment}
                    disabled={!amount || isCalculating}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-secondary-500 to-secondary-400 text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    
                    <span className={`relative z-10 flex items-center justify-center gap-3 ${isCalculating ? 'opacity-0' : ''}`}>
                      احسب القسط الشهري
                      <ArrowIcon className="w-5 h-5" />
                    </span>
                    
                    {isCalculating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
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

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,120 L0,60 Q360,120 720,60 Q1080,0 1440,60 L1440,120 Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
