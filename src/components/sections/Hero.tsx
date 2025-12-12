'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  ArrowLeft, 
  ArrowRight,
  Calculator,
  Sparkles
} from 'lucide-react'
import {
  AnimatedLoanCalculator,
} from '@/components/icons/AnimatedIcons'

export default function Hero() {
  const { t, dir } = useI18n()
  const [activeTab, setActiveTab] = useState<'individuals' | 'business'>('individuals')
  const [financingType, setFinancingType] = useState('car')
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('36')
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-100/30 to-transparent rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Calculator className="w-4 h-4" />
            <span>{t('hero.calculator_badge') || 'حاسبة التمويل'}</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero.calculator_title') || 'احسب قسطك الشهري'}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('hero.calculator_description') || 'استخدم حاسبة التمويل لمعرفة القسط الشهري المتوقع'}
          </motion.p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="relative w-full max-w-xl"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Card Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AnimatedLoanCalculator size={24} className="text-white" delay={0.3} />
                </div>
                <h3 className="text-2xl font-bold text-primary-600">
                  {t('hero.quick_calculator') || 'الحاسبة السريعة'}
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
                    className="p-5 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100"
                  >
                    <p className="text-sm text-gray-600 mb-1">{t('hero.monthly_payment') || 'القسط الشهري التقريبي'}</p>
                    <p className="text-4xl font-bold text-primary-600" dir="ltr">
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
                    <ArrowIcon className="w-5 h-5" />
                  </span>
                  {isCalculating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Apply Now Link */}
                <div className="text-center pt-2">
                  <a 
                    href="/apply" 
                    className="inline-flex items-center gap-2 text-secondary-500 font-semibold hover:text-secondary-600 transition-colors"
                  >
                    <span>{t('hero.apply_now') || 'تقدم بطلبك الآن'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600">+45</div>
            <div className="text-sm text-gray-500">{t('stats.years')}</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600">+500K</div>
            <div className="text-sm text-gray-500">{t('stats.customers')}</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600">100%</div>
            <div className="text-sm text-gray-500">{t('stats.shariah')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
