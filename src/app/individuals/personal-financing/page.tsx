'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Wallet, 
  CheckCircle, 
  Clock, 
  Shield, 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Percent,
  FileText,
  Sparkles,
  BadgeCheck
} from 'lucide-react'
import { AnimatedPersonalFinancing, AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: Clock,
    title: 'Fast Disbursement',
    titleAr: 'صرف سريع',
    desc: 'Get funds within 48 hours',
    descAr: 'احصل على الأموال خلال 48 ساعة',
  },
  {
    icon: Percent,
    title: 'Low Rates',
    titleAr: 'أسعار منخفضة',
    desc: 'Starting from 4.25% APR',
    descAr: 'تبدأ من 4.25% سنوياً',
  },
  {
    icon: Shield,
    title: 'Sharia Compliant',
    titleAr: 'متوافق مع الشريعة',
    desc: '100% Islamic financing',
    descAr: 'تمويل إسلامي 100%',
  },
  {
    icon: BadgeCheck,
    title: 'No Guarantor',
    titleAr: 'بدون كفيل',
    desc: 'No guarantor required',
    descAr: 'لا حاجة لكفيل',
  },
]

const benefits = [
  { en: 'Finance up to 250,000 SAR', ar: 'تمويل يصل إلى 250,000 ريال' },
  { en: 'Repayment period up to 60 months', ar: 'فترة سداد تصل إلى 60 شهراً' },
  { en: 'Flexible payment schedules', ar: 'جداول سداد مرنة' },
  { en: 'No salary transfer required', ar: 'بدون تحويل راتب' },
  { en: 'Early settlement option', ar: 'خيار السداد المبكر' },
  { en: 'Online application', ar: 'تقديم إلكتروني' },
]

const useCases = [
  {
    title: 'Home Renovation',
    titleAr: 'تجديد المنزل',
    desc: 'Upgrade your living space',
    descAr: 'طور مساحة معيشتك',
    icon: '🏠',
  },
  {
    title: 'Education',
    titleAr: 'التعليم',
    desc: 'Invest in your future',
    descAr: 'استثمر في مستقبلك',
    icon: '🎓',
  },
  {
    title: 'Medical Expenses',
    titleAr: 'النفقات الطبية',
    desc: 'Healthcare needs',
    descAr: 'احتياجات الرعاية الصحية',
    icon: '🏥',
  },
  {
    title: 'Wedding',
    titleAr: 'الزفاف',
    desc: 'Celebrate your special day',
    descAr: 'احتفل بيومك المميز',
    icon: '💒',
  },
  {
    title: 'Travel',
    titleAr: 'السفر',
    desc: 'Explore the world',
    descAr: 'استكشف العالم',
    icon: '✈️',
  },
  {
    title: 'Debt Consolidation',
    titleAr: 'توحيد الديون',
    desc: 'Simplify your finances',
    descAr: 'بسّط أمورك المالية',
    icon: '💳',
  },
]

export default function PersonalFinancingPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Personal Financing"
        titleAr="التمويل الشخصي"
        subtitle="Flexible cash financing to meet your personal needs"
        subtitleAr="تمويل نقدي مرن لتلبية احتياجاتك الشخصية"
        badge="Individual Financing"
        badgeAr="تمويل الأفراد"
        BadgeIcon={Wallet}
      />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center p-8 bg-gray-50 rounded-3xl hover:bg-primary-50 transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 group-hover:bg-primary-500 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? feature.titleAr : feature.title}
                </h3>
                <p className="text-gray-500">
                  {language === 'ar' ? feature.descAr : feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'استخدامات التمويل' : 'Financing Uses'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'لأي غرض تحتاج التمويل؟' : 'What Do You Need Financing For?'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تمويلنا الشخصي يغطي جميع احتياجاتك'
                : 'Our personal financing covers all your needs'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{useCase.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {language === 'ar' ? useCase.titleAr : useCase.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {language === 'ar' ? useCase.descAr : useCase.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '30px 30px',
                  }} />
                </div>
                
                {/* Floating Icon */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <AnimatedPersonalFinancing size={150} className="text-white" />
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">250K</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'الحد الأقصى' : 'Max Amount'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">48h</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'وقت الصرف' : 'Disbursement'}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'مميزات التمويل' : 'Financing Benefits'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'تمويل شخصي يناسب احتياجاتك'
                  : 'Personal Financing That Fits Your Needs'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نقدم لك تمويلاً شخصياً مرناً بأسعار تنافسية وإجراءات سهلة. احصل على الأموال التي تحتاجها لتحقيق أهدافك.'
                  : 'We offer flexible personal financing with competitive rates and easy procedures. Get the funds you need to achieve your goals.'}
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-secondary-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? benefit.ar : benefit.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}</span>
                  <ArrowIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  <Calculator className="w-5 h-5" />
                  <span>{language === 'ar' ? 'حاسبة التمويل' : 'Calculator'}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              {language === 'ar' ? 'ابدأ رحلتك المالية اليوم' : 'Start Your Financial Journey Today'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تقديم سهل وموافقة سريعة'
                : 'Easy application and quick approval'}
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
            >
              <span>{language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
