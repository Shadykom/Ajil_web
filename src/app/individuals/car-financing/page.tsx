'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Car, 
  CheckCircle, 
  Clock, 
  Shield, 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Percent,
  FileText,
  Sparkles
} from 'lucide-react'
import { AnimatedCarFinancing, AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: Clock,
    title: 'Quick Approval',
    titleAr: 'موافقة سريعة',
    desc: 'Get approved within 24 hours',
    descAr: 'احصل على الموافقة خلال 24 ساعة',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    titleAr: 'أسعار تنافسية',
    desc: 'Starting from 3.75% APR',
    descAr: 'تبدأ من 3.75% سنوياً',
  },
  {
    icon: Shield,
    title: 'Sharia Compliant',
    titleAr: 'متوافق مع الشريعة',
    desc: '100% Islamic financing',
    descAr: 'تمويل إسلامي 100%',
  },
  {
    icon: FileText,
    title: 'Minimal Documents',
    titleAr: 'مستندات بسيطة',
    desc: 'Easy documentation process',
    descAr: 'عملية توثيق سهلة',
  },
]

const benefits = [
  { en: 'Finance up to 500,000 SAR', ar: 'تمويل يصل إلى 500,000 ريال' },
  { en: 'Repayment period up to 60 months', ar: 'فترة سداد تصل إلى 60 شهراً' },
  { en: 'New and used vehicles', ar: 'سيارات جديدة ومستعملة' },
  { en: 'Free insurance for the first year', ar: 'تأمين مجاني للسنة الأولى' },
  { en: 'All major car brands', ar: 'جميع ماركات السيارات الرئيسية' },
  { en: 'No salary transfer required', ar: 'بدون تحويل راتب' },
]

const steps = [
  {
    step: '01',
    title: 'Apply Online',
    titleAr: 'قدم طلبك إلكترونياً',
    desc: 'Fill out our simple online application form',
    descAr: 'املأ نموذج التقديم الإلكتروني البسيط',
  },
  {
    step: '02',
    title: 'Get Approved',
    titleAr: 'احصل على الموافقة',
    desc: 'Receive quick approval within 24 hours',
    descAr: 'احصل على موافقة سريعة خلال 24 ساعة',
  },
  {
    step: '03',
    title: 'Choose Your Car',
    titleAr: 'اختر سيارتك',
    desc: 'Select from our wide range of partner dealers',
    descAr: 'اختر من مجموعة واسعة من الوكلاء الشركاء',
  },
  {
    step: '04',
    title: 'Drive Away',
    titleAr: 'انطلق بسيارتك',
    desc: 'Complete the paperwork and drive your new car',
    descAr: 'أكمل الأوراق واستلم سيارتك الجديدة',
  },
]

export default function CarFinancingPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Car Financing"
        titleAr="تمويل السيارات"
        subtitle="Drive your dream car today with AJIL's flexible car financing solutions"
        subtitleAr="قُد سيارة أحلامك اليوم مع حلول تمويل السيارات المرنة من أجيل"
        badge="Individual Financing"
        badgeAr="تمويل الأفراد"
        BadgeIcon={Car}
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
              <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'لماذا تختار أجيل؟' : 'Why Choose AJIL?'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'تمويل سيارتك بأسهل الطرق'
                  : 'Finance Your Car the Easy Way'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نقدم لك حلول تمويل مرنة تناسب احتياجاتك، مع أسعار تنافسية وخدمة عملاء متميزة. سواء كنت تبحث عن سيارة جديدة أو مستعملة، نحن هنا لمساعدتك.'
                  : 'We offer flexible financing solutions tailored to your needs, with competitive rates and excellent customer service. Whether you are looking for a new or used car, we are here to help.'}
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

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 overflow-hidden">
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
                    <AnimatedCarFinancing size={150} className="text-white" />
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">3.75%</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'تبدأ من' : 'Starting APR'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">60</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'شهر كحد أقصى' : 'Max Months'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'كيف يعمل؟' : 'How It Works'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'احصل على تمويل سيارتك في 4 خطوات بسيطة'
                : 'Get your car financing in 4 simple steps'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-12 ${dir === 'rtl' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent`} />
                )}
                
                <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl font-black text-primary-100 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? step.titleAr : step.title}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'ar' ? step.descAr : step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
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
              {language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'قدم طلبك اليوم واحصل على موافقة فورية'
                : 'Apply today and get instant approval'}
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
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
