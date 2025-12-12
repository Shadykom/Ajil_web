'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Truck, 
  CheckCircle, 
  Clock, 
  Shield, 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Percent,
  Car,
  Sparkles,
  Users
} from 'lucide-react'
import { AnimatedCarFinancing, AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: Truck,
    title: 'Fleet Financing',
    titleAr: 'تمويل الأسطول',
    desc: 'Finance your entire fleet',
    descAr: 'موّل أسطولك بالكامل',
  },
  {
    icon: Clock,
    title: 'Quick Delivery',
    titleAr: 'تسليم سريع',
    desc: 'Fast vehicle delivery',
    descAr: 'تسليم المركبات بسرعة',
  },
  {
    icon: Shield,
    title: 'Sharia Compliant',
    titleAr: 'متوافق مع الشريعة',
    desc: '100% Islamic financing',
    descAr: 'تمويل إسلامي 100%',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    titleAr: 'دعم مخصص',
    desc: 'Business account manager',
    descAr: 'مدير حساب للأعمال',
  },
]

const vehicleTypes = [
  {
    title: 'Commercial Vehicles',
    titleAr: 'المركبات التجارية',
    desc: 'Vans, trucks, and delivery vehicles',
    descAr: 'شاحنات صغيرة وكبيرة ومركبات التوصيل',
    icon: '🚚',
  },
  {
    title: 'Executive Cars',
    titleAr: 'سيارات تنفيذية',
    desc: 'Premium vehicles for executives',
    descAr: 'سيارات فاخرة للإداريين',
    icon: '🚗',
  },
  {
    title: 'Buses',
    titleAr: 'الحافلات',
    desc: 'Staff and passenger transport',
    descAr: 'نقل الموظفين والركاب',
    icon: '🚌',
  },
  {
    title: 'Specialized Vehicles',
    titleAr: 'المركبات المتخصصة',
    desc: 'Custom business vehicles',
    descAr: 'مركبات أعمال مخصصة',
    icon: '🚐',
  },
]

const benefits = [
  { en: 'Finance up to 50 vehicles', ar: 'تمويل يصل إلى 50 مركبة' },
  { en: 'New and used vehicles', ar: 'مركبات جديدة ومستعملة' },
  { en: 'Flexible payment terms', ar: 'شروط سداد مرنة' },
  { en: 'All major brands', ar: 'جميع الماركات الرئيسية' },
  { en: 'Insurance included', ar: 'تأمين شامل' },
  { en: 'Maintenance packages available', ar: 'باقات صيانة متوفرة' },
]

export default function BusinessCarFinancingPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Business Vehicle Financing"
        titleAr="تمويل مركبات الأعمال"
        subtitle="Fleet and commercial vehicle financing for your business needs"
        subtitleAr="تمويل الأساطيل والمركبات التجارية لاحتياجات أعمالك"
        badge="Business Financing"
        badgeAr="تمويل الأعمال"
        BadgeIcon={Truck}
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
                className="group text-center p-8 bg-gray-50 rounded-3xl hover:bg-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 group-hover:bg-blue-500 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
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

      {/* Vehicle Types Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'أنواع المركبات' : 'Vehicle Types'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'نموّل جميع أنواع المركبات' : 'We Finance All Vehicle Types'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'من السيارات التنفيذية إلى الشاحنات الثقيلة'
                : 'From executive cars to heavy trucks'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {language === 'ar' ? type.titleAr : type.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {language === 'ar' ? type.descAr : type.desc}
                </p>
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
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-12 overflow-hidden">
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
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'أقصى عدد مركبات' : 'Max Vehicles'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">60</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'شهر كحد أقصى' : 'Max Months'}</div>
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
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'مميزات التمويل' : 'Financing Benefits'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'أسطول مركبات يدعم نجاح أعمالك'
                  : 'A Vehicle Fleet That Supports Your Business Success'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نساعدك في بناء وتوسيع أسطول مركبات عملك من خلال حلول تمويلية مرنة تناسب احتياجاتك التشغيلية.'
                  : 'We help you build and expand your business vehicle fleet through flexible financing solutions that meet your operational needs.'}
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
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? benefit.ar : benefit.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}</span>
                  <ArrowIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
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
              {language === 'ar' ? 'هل أنت مستعد لبناء أسطولك؟' : 'Ready to Build Your Fleet?'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تواصل مع فريقنا للحصول على عرض مخصص لأعمالك'
                : 'Contact our team for a customized quote for your business'}
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
            >
              <span>{language === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
