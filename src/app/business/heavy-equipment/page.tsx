'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Cog, 
  CheckCircle, 
  Clock, 
  Shield, 
  ArrowRight, 
  ArrowLeft,
  HardHat,
  Sparkles,
  Wrench
} from 'lucide-react'
import { AnimatedBusinessFinancing, AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: Cog,
    title: 'All Equipment Types',
    titleAr: 'جميع أنواع المعدات',
    desc: 'Construction, industrial & more',
    descAr: 'إنشائية، صناعية وأكثر',
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    titleAr: 'معالجة سريعة',
    desc: 'Quick approval process',
    descAr: 'عملية موافقة سريعة',
  },
  {
    icon: Shield,
    title: 'Sharia Compliant',
    titleAr: 'متوافق مع الشريعة',
    desc: '100% Islamic financing',
    descAr: 'تمويل إسلامي 100%',
  },
  {
    icon: Wrench,
    title: 'Maintenance Support',
    titleAr: 'دعم الصيانة',
    desc: 'Optional maintenance packages',
    descAr: 'باقات صيانة اختيارية',
  },
]

const equipmentTypes = [
  {
    title: 'Construction Equipment',
    titleAr: 'معدات البناء',
    items: ['Excavators', 'Bulldozers', 'Cranes', 'Loaders'],
    itemsAr: ['حفارات', 'جرافات', 'رافعات', 'لوادر'],
    icon: '🏗️',
  },
  {
    title: 'Agricultural Equipment',
    titleAr: 'المعدات الزراعية',
    items: ['Tractors', 'Harvesters', 'Sprayers', 'Tillers'],
    itemsAr: ['جرارات', 'حصادات', 'رشاشات', 'محاريث'],
    icon: '🚜',
  },
  {
    title: 'Industrial Machinery',
    titleAr: 'الآلات الصناعية',
    items: ['Forklifts', 'Generators', 'Compressors', 'Pumps'],
    itemsAr: ['رافعات شوكية', 'مولدات', 'ضواغط', 'مضخات'],
    icon: '🏭',
  },
  {
    title: 'Mining Equipment',
    titleAr: 'معدات التعدين',
    items: ['Dump Trucks', 'Drills', 'Crushers', 'Conveyors'],
    itemsAr: ['شاحنات قلابة', 'حفارات', 'كسارات', 'ناقلات'],
    icon: '⛏️',
  },
]

const benefits = [
  { en: 'Finance up to 10,000,000 SAR', ar: 'تمويل يصل إلى 10,000,000 ريال' },
  { en: 'New and used equipment', ar: 'معدات جديدة ومستعملة' },
  { en: 'Repayment up to 84 months', ar: 'سداد يصل إلى 84 شهراً' },
  { en: 'Competitive profit rates', ar: 'معدلات ربح تنافسية' },
  { en: 'Flexible down payment', ar: 'دفعة أولى مرنة' },
  { en: 'Expert industry consultants', ar: 'مستشارون خبراء في المجال' },
]

export default function HeavyEquipmentPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Heavy Equipment Financing"
        titleAr="تمويل المعدات الثقيلة"
        subtitle="Finance construction, industrial, and agricultural equipment"
        subtitleAr="تمويل المعدات الإنشائية والصناعية والزراعية"
        badge="Business Financing"
        badgeAr="تمويل الأعمال"
        BadgeIcon={HardHat}
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
                className="group text-center p-8 bg-gray-50 rounded-3xl hover:bg-amber-50 transition-all duration-300 border border-gray-100 hover:border-amber-200"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 group-hover:bg-amber-500 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
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

      {/* Equipment Types Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'أنواع المعدات' : 'Equipment Types'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'نموّل جميع أنواع المعدات' : 'We Finance All Equipment Types'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4 text-center">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {language === 'ar' ? type.titleAr : type.title}
                </h3>
                <ul className="space-y-2">
                  {(language === 'ar' ? type.itemsAr : type.items).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'مميزات التمويل' : 'Financing Benefits'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'معدات تدعم مشاريعك الكبرى'
                  : 'Equipment That Supports Your Major Projects'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نقدم تمويلاً شاملاً للمعدات الثقيلة يساعدك في تنفيذ مشاريعك بكفاءة عالية. حلول مرنة تناسب جميع القطاعات.'
                  : 'We provide comprehensive heavy equipment financing to help you execute your projects with high efficiency. Flexible solutions for all sectors.'}
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
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? benefit.ar : benefit.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all"
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

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-12 overflow-hidden">
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
                    <div className="text-3xl font-bold">10M</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'الحد الأقصى' : 'Max SAR'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">84</div>
                    <div className="text-sm text-white/70">{language === 'ar' ? 'شهر كحد أقصى' : 'Max Months'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600 relative overflow-hidden">
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
              {language === 'ar' ? 'جاهز لتمويل معداتك؟' : 'Ready to Finance Your Equipment?'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تواصل مع خبرائنا للحصول على أفضل عرض تمويلي'
                : 'Contact our experts for the best financing offer'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-amber-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
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
