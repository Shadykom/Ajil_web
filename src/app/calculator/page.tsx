'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info,
  TrendingUp
} from 'lucide-react'
import { AnimatedLoanCalculator, AjilSymbol } from '@/components/icons'

const financingTypes = [
  { key: 'car', label: 'Car Financing', labelAr: 'تمويل السيارات', rate: 0.0375 },
  { key: 'personal', label: 'Personal Financing', labelAr: 'التمويل الشخصي', rate: 0.0425 },
  { key: 'business', label: 'Business Financing', labelAr: 'تمويل الأعمال', rate: 0.04 },
]

const durations = [12, 24, 36, 48, 60]

export default function CalculatorPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight
  
  const [financingType, setFinancingType] = useState('car')
  const [amount, setAmount] = useState('100000')
  const [duration, setDuration] = useState(36)
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [totalPayment, setTotalPayment] = useState<number | null>(null)
  const [totalProfit, setTotalProfit] = useState<number | null>(null)

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '')
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/,/g, '')) || 0
  }

  const calculate = () => {
    const principal = parseNumber(amount)
    const selectedType = financingTypes.find(t => t.key === financingType)
    const annualRate = selectedType?.rate || 0.04
    const monthlyRate = annualRate / 12
    const months = duration

    if (principal > 0 && months > 0) {
      // Calculate using standard amortization formula
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const total = payment * months
      const profit = total - principal

      setMonthlyPayment(Math.round(payment))
      setTotalPayment(Math.round(total))
      setTotalProfit(Math.round(profit))
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Financing Calculator"
        titleAr="حاسبة التمويل"
        subtitle="Calculate your monthly payments and plan your financing"
        subtitleAr="احسب أقساطك الشهرية وخطط لتمويلك"
        badge="Financial Tools"
        badgeAr="أدوات مالية"
        BadgeIcon={Calculator}
      />

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <AnimatedLoanCalculator size={24} className="text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? 'حاسبة التمويل' : 'Loan Calculator'}
                  </h2>
                </div>

                {/* Financing Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'ar' ? 'نوع التمويل' : 'Financing Type'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {financingTypes.map((type) => (
                      <button
                        key={type.key}
                        onClick={() => setFinancingType(type.key)}
                        className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                          financingType === type.key
                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {language === 'ar' ? type.labelAr : type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'ar' ? 'مبلغ التمويل' : 'Financing Amount'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatNumber(amount)}
                      onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-2xl font-bold text-gray-900 text-center focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      dir="ltr"
                    />
                    <span className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 font-medium`}>
                      SAR
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={parseNumber(amount)}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>10,000</span>
                    <span>500,000</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'ar' ? 'مدة التمويل (بالأشهر)' : 'Financing Duration (Months)'}
                  </label>
                  <div className="flex gap-3">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                          duration === d
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calculator className="w-5 h-5" />
                  <span>{language === 'ar' ? 'احسب الآن' : 'Calculate Now'}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {monthlyPayment ? (
                <div className="space-y-6">
                  {/* Monthly Payment Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 opacity-10">
                      <AjilSymbol size={200} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-white/70 mb-2">
                        {language === 'ar' ? 'القسط الشهري التقريبي' : 'Estimated Monthly Payment'}
                      </p>
                      <div className="text-5xl font-black mb-2" dir="ltr">
                        {monthlyPayment.toLocaleString()} <span className="text-2xl">SAR</span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {language === 'ar' ? `لمدة ${duration} شهر` : `For ${duration} months`}
                      </p>
                    </div>
                  </motion.div>

                  {/* Breakdown Cards */}
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
                    >
                      <p className="text-gray-500 text-sm mb-2">
                        {language === 'ar' ? 'إجمالي المبلغ المسدد' : 'Total Repayment'}
                      </p>
                      <div className="text-2xl font-bold text-gray-900" dir="ltr">
                        {totalPayment?.toLocaleString()} <span className="text-sm">SAR</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
                    >
                      <p className="text-gray-500 text-sm mb-2">
                        {language === 'ar' ? 'إجمالي الربح' : 'Total Profit'}
                      </p>
                      <div className="text-2xl font-bold text-secondary-600" dir="ltr">
                        {totalProfit?.toLocaleString()} <span className="text-sm">SAR</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* APR Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 rounded-2xl p-6 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 mb-1">
                        {language === 'ar' ? 'معدل النسبة السنوي' : 'Annual Percentage Rate'}
                      </h4>
                      <p className="text-blue-600 text-sm">
                        {language === 'ar'
                          ? `تبدأ من ${(financingTypes.find(t => t.key === financingType)?.rate || 0.04) * 100}% - قد تختلف بناءً على الملف الائتماني`
                          : `Starting from ${(financingTypes.find(t => t.key === financingType)?.rate || 0.04) * 100}% - May vary based on credit profile`}
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/apply"
                      className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-secondary-500 to-orange-500 text-white py-5 rounded-xl font-bold text-lg shadow-lg shadow-secondary-500/25 hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>{language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-12 bg-gray-50 rounded-3xl">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center"
                    >
                      <TrendingUp className="w-12 h-12 text-primary-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      {language === 'ar' ? 'ابدأ الحساب' : 'Start Calculating'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'ar'
                        ? 'أدخل المبلغ والمدة ثم اضغط على "احسب الآن"'
                        : 'Enter amount and duration, then click "Calculate Now"'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              {language === 'ar'
                ? '* هذه الحاسبة للأغراض التوضيحية فقط. النتائج تقريبية وقد تختلف عن العرض الفعلي. الموافقة النهائية والشروط تخضع لتقييم الائتمان والسياسات المعمول بها.'
                : '* This calculator is for illustrative purposes only. Results are approximate and may differ from actual offer. Final approval and terms are subject to credit assessment and applicable policies.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
