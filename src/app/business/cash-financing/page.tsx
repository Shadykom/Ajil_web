'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Percent,
  TrendingUp,
  Sparkles,
  Briefcase
} from 'lucide-react'
import { AnimatedBusinessFinancing, AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: TrendingUp,
    title: 'Growth Capital',
    titleAr: 'رأس مال للنمو',
    desc: 'Fund your business expansion',
    descAr: 'موّل توسع أعمالك',
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    titleAr: 'معالجة سريعة',
    desc: 'Approval within 72 hours',
    descAr: 'موافقة خلال 72 ساعة',
  },
  {
    icon: Shield,
    title: 'Sharia Compliant',
    titleAr: 'متوافق مع الشريعة',
    desc: '100% Islamic financing',
    descAr: 'تمويل إسلامي 100%',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    titleAr: 'أسعار تنافسية',
    desc: 'Best rates for businesses',
    descAr: 'أفضل أسعار للأعمال',
  },
]

const benefits = [
  { en: 'Finance up to 5,000,000 SAR', ar: 'تمويل يصل إلى 5,000,000 ريال' },
  { en: 'Repayment period up to 60 months', ar: 'فترة سداد تصل إلى 60 شهراً' },
  { en: 'Flexible collateral options', ar: 'خيارات ضمانات مرنة' },
  { en: 'Working capital financing', ar: 'تمويل رأس المال العامل' },
  { en: 'Expansion financing', ar: 'تمويل التوسع' },
  { en: 'Dedicated account manager', ar: 'مدير حساب مخصص' },
]

const eligibility = [
  {
    title: 'Business Age',
    titleAr: 'عمر الشركة',
    desc: 'Minimum 2 years in operation',
    descAr: 'حد أدنى سنتين من التشغيل',
    icon: Building2,
  },
  {
    title: 'Annual Revenue',
    titleAr: 'الإيرادات السنوية',
    desc: 'Minimum 500,000 SAR',
    descAr: 'حد أدنى 500,000 ريال',
    icon: TrendingUp,
  },
  {
    title: 'Valid CR',
    titleAr: 'سجل تجاري ساري',
    desc: 'Active commercial registration',
    descAr: 'سجل تجاري نشط',
    icon: Briefcase,
  },
]

export default function BusinessCashFinancingPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Business Cash Financing"
        titleAr="تمويل الأعمال النقدي"
        subtitle="Flexible financing solutions to grow your business"
        subtitleAr="حلول تمويلية مرنة لتنمية أعمالك"
        badge="Business Financing"
        badgeAr="تمويل الأعمال"
        BadgeIcon={Building2}
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
                className="group text-center p-8 bg-gray-50 rounded-3xl hover:bg-purple-50 transition-all duration-300 border border-gray-100 hover:border-purple-200"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 group-hover:bg-purple-500 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
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

      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'نموّ أعمالك' : 'Grow Your Business'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'تمويل يدعم طموحاتك التجارية'
                  : 'Financing That Supports Your Business Ambitions'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نقدم حلول تمويلية مصممة خصيصاً لتلبية احتياجات الشركات بمختلف أحجامها. سواء كنت تبحث عن تمويل رأس المال العامل أو التوسع في أعمالك.'
                  : 'We offer financing solutions specifically designed to meet the needs of businesses of all sizes. Whether you are looking for working capital financing or business expansion.'}
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? benefit.ar : benefit.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
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

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl p-12 overflow-hidden">
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
                    <AnimatedBusinessFinancing size={150} className="text-white" />
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">5M</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'الحد الأقصى' : 'Max SAR'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">72h</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'وقت الموافقة' : 'Approval Time'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'متطلبات الأهلية' : 'Eligibility Requirements'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تحقق من استيفائك لمتطلبات التمويل'
                : 'Check if you meet our financing requirements'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {eligibility.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? item.titleAr : item.title}
                </h3>
                <p className="text-gray-500">
                  {language === 'ar' ? item.descAr : item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-violet-700 relative overflow-hidden">
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
              {language === 'ar' ? 'هل أنت مستعد لتنمية أعمالك؟' : 'Ready to Grow Your Business?'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تواصل مع فريق الأعمال لدينا للحصول على حلول تمويلية مخصصة'
                : 'Contact our business team for customized financing solutions'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
            >
              <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
