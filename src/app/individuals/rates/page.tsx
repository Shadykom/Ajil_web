'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Percent, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Calculator,
  Sparkles,
  Info
} from 'lucide-react'
import { AnimatedLoanCalculator, AjilSymbol } from '@/components/icons'

const ratesData = [
  {
    product: 'Car Financing',
    productAr: 'تمويل السيارات',
    rate: '3.75%',
    maxAmount: '500,000 SAR',
    maxAmountAr: '500,000 ريال',
    maxTenure: '60 months',
    maxTenureAr: '60 شهر',
    icon: '🚗',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    href: '/individuals/car-financing',
  },
  {
    product: 'Personal Financing',
    productAr: 'التمويل الشخصي',
    rate: '4.25%',
    maxAmount: '250,000 SAR',
    maxAmountAr: '250,000 ريال',
    maxTenure: '60 months',
    maxTenureAr: '60 شهر',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    href: '/individuals/personal-financing',
  },
]

const aprInfo = [
  {
    title: 'What is APR?',
    titleAr: 'ما هو معدل النسبة السنوي؟',
    desc: 'APR (Annual Percentage Rate) represents the total annual cost of financing, including profit rates and fees.',
    descAr: 'معدل النسبة السنوي يمثل التكلفة الإجمالية السنوية للتمويل، بما في ذلك معدلات الربح والرسوم.',
  },
  {
    title: 'Fixed vs Variable Rates',
    titleAr: 'معدلات ثابتة أم متغيرة',
    desc: 'AJIL offers fixed rates, meaning your monthly payment stays the same throughout the financing period.',
    descAr: 'تقدم أجيل معدلات ثابتة، مما يعني أن دفعتك الشهرية تبقى ثابتة طوال فترة التمويل.',
  },
  {
    title: 'Early Settlement',
    titleAr: 'السداد المبكر',
    desc: 'You can settle your financing early with a reduction in total cost according to SAMA regulations.',
    descAr: 'يمكنك سداد تمويلك مبكراً مع تخفيض في التكلفة الإجمالية وفقاً لأنظمة ساما.',
  },
]

export default function RatesPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Financing Rates"
        titleAr="أسعار التمويل"
        subtitle="Transparent and competitive rates for all your financing needs"
        subtitleAr="أسعار شفافة وتنافسية لجميع احتياجاتك التمويلية"
        badge="Individual Financing"
        badgeAr="تمويل الأفراد"
        BadgeIcon={Percent}
      />

      {/* Rates Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'أسعارنا التنافسية' : 'Our Competitive Rates'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'جدول أسعار التمويل' : 'Financing Rate Table'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'أسعار شفافة بدون رسوم مخفية'
                : 'Transparent rates with no hidden fees'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ratesData.map((rate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:border-primary-300 hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${rate.color}`} />
                
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 ${rate.bgColor} rounded-2xl flex items-center justify-center text-3xl`}>
                      {rate.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {language === 'ar' ? rate.productAr : rate.product}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {language === 'ar' ? 'معدل النسبة السنوي' : 'Annual Percentage Rate'}
                      </p>
                    </div>
                  </div>

                  {/* Rate Display */}
                  <div className="text-center py-8 mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                    <div className="text-5xl font-black text-primary-600 mb-2">
                      {rate.rate}
                    </div>
                    <p className="text-gray-500">
                      {language === 'ar' ? 'تبدأ من' : 'Starting from'}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">
                        {language === 'ar' ? 'الحد الأقصى' : 'Max Amount'}
                      </span>
                      <span className="font-bold text-gray-900">
                        {language === 'ar' ? rate.maxAmountAr : rate.maxAmount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">
                        {language === 'ar' ? 'أقصى مدة' : 'Max Tenure'}
                      </span>
                      <span className="font-bold text-gray-900">
                        {language === 'ar' ? rate.maxTenureAr : rate.maxTenure}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={rate.href}
                    className={`flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r ${rate.color} text-white rounded-xl font-bold hover:shadow-lg transition-all`}
                  >
                    <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APR Information Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'معلومات مهمة عن الأسعار' : 'Important Rate Information'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aprInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <Info className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'ar' ? info.titleAr : info.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {language === 'ar' ? info.descAr : info.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-12 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }} />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-extrabold mb-6">
                  {language === 'ar' ? 'احسب قسطك الشهري' : 'Calculate Your Monthly Payment'}
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  {language === 'ar'
                    ? 'استخدم حاسبة التمويل لمعرفة القسط الشهري المناسب لك'
                    : 'Use our financing calculator to find the monthly payment that suits you'}
                </p>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 transition-all"
                >
                  <Calculator className="w-5 h-5" />
                  <span>{language === 'ar' ? 'حاسبة التمويل' : 'Loan Calculator'}</span>
                  <ArrowIcon className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <AnimatedLoanCalculator size={100} className="text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              {language === 'ar'
                ? '* الأسعار المذكورة هي أسعار إرشادية وقد تختلف بناءً على الملف الائتماني للعميل والمبلغ ومدة التمويل. للحصول على عرض سعر دقيق، يرجى التقديم على موقعنا أو زيارة أقرب فرع.'
                : '* Rates mentioned are indicative and may vary based on customer credit profile, amount, and tenure. For an accurate quote, please apply on our website or visit the nearest branch.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
