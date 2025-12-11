'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Heart, 
  CheckCircle, 
  Users, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Sparkles,
  GraduationCap,
  Briefcase
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const features = [
  {
    icon: Lightbulb,
    title: 'Startup Support',
    titleAr: 'دعم المشاريع الناشئة',
    desc: 'Launch your business idea',
    descAr: 'أطلق فكرة مشروعك',
  },
  {
    icon: GraduationCap,
    title: 'Training Programs',
    titleAr: 'برامج تدريبية',
    desc: 'Skills development',
    descAr: 'تطوير المهارات',
  },
  {
    icon: Users,
    title: 'Community Impact',
    titleAr: 'أثر مجتمعي',
    desc: 'Empowering communities',
    descAr: 'تمكين المجتمعات',
  },
  {
    icon: Target,
    title: 'Job Creation',
    titleAr: 'خلق فرص العمل',
    desc: 'Creating employment',
    descAr: 'إيجاد فرص التوظيف',
  },
]

const programs = [
  {
    title: 'Micro Financing',
    titleAr: 'التمويل الأصغر',
    desc: 'Small loans for micro-enterprises to start or expand their businesses',
    descAr: 'قروض صغيرة للمؤسسات الصغيرة لبدء أو توسيع أعمالها',
    amount: 'Up to 100,000 SAR',
    amountAr: 'حتى 100,000 ريال',
    icon: '💰',
  },
  {
    title: 'Job Placement',
    titleAr: 'التوظيف',
    desc: 'Connecting job seekers with employment opportunities',
    descAr: 'ربط الباحثين عن عمل بفرص التوظيف',
    amount: 'Free Service',
    amountAr: 'خدمة مجانية',
    icon: '👔',
  },
  {
    title: 'Vocational Training',
    titleAr: 'التدريب المهني',
    desc: 'Skills training for career development',
    descAr: 'تدريب مهني لتطوير المسار الوظيفي',
    amount: 'Subsidized Programs',
    amountAr: 'برامج مدعومة',
    icon: '🎓',
  },
  {
    title: 'Business Incubation',
    titleAr: 'حاضنات الأعمال',
    desc: 'Support and mentorship for startups',
    descAr: 'دعم وإرشاد للمشاريع الناشئة',
    amount: 'Comprehensive Support',
    amountAr: 'دعم شامل',
    icon: '🚀',
  },
]

const stats = [
  { value: '500K+', label: 'People Supported', labelAr: 'شخص تم دعمهم' },
  { value: '50K+', label: 'Jobs Created', labelAr: 'وظيفة تم إيجادها' },
  { value: '30+', label: 'Years of Impact', labelAr: 'سنة من التأثير' },
  { value: '100%', label: 'Sharia Compliant', labelAr: 'متوافق مع الشريعة' },
]

const eligibility = [
  { en: 'Saudi nationals', ar: 'مواطنون سعوديون' },
  { en: 'Age between 18-60 years', ar: 'العمر بين 18-60 سنة' },
  { en: 'Valid business idea or existing micro-business', ar: 'فكرة عمل صالحة أو مشروع صغير قائم' },
  { en: 'Commitment to training and mentorship', ar: 'الالتزام بالتدريب والإرشاد' },
  { en: 'No existing bank loans', ar: 'عدم وجود قروض بنكية قائمة' },
]

export default function BabRizqJameelPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Bab Rizq Jameel"
        titleAr="باب رزق جميل"
        subtitle="Empowering communities through sustainable economic development"
        subtitleAr="تمكين المجتمعات من خلال التنمية الاقتصادية المستدامة"
        badge="Social Impact"
        badgeAr="الأثر الاجتماعي"
        BadgeIcon={Heart}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-medium">
                  {language === 'ar' ? stat.labelAr : stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'مميزات البرنامج' : 'Program Features'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'كيف نساعدك' : 'How We Help You'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center p-8 bg-white rounded-3xl hover:bg-rose-50 transition-all duration-300 border border-gray-100 hover:border-rose-200 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-rose-100 group-hover:bg-rose-500 rounded-2xl flex items-center justify-center transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-rose-600 group-hover:text-white transition-colors" />
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

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'برامجنا' : 'Our Programs'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'حلول متكاملة لدعم رحلتك نحو الاستقلال الاقتصادي'
                : 'Comprehensive solutions to support your journey to economic independence'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{program.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {language === 'ar' ? program.titleAr : program.title}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {language === 'ar' ? program.descAr : program.desc}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold">
                      {language === 'ar' ? program.amountAr : program.amount}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'شروط الأهلية' : 'Eligibility'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' 
                  ? 'هل تستوفي الشروط؟'
                  : 'Are You Eligible?'}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'برنامج باب رزق جميل مخصص لدعم المواطنين السعوديين الطموحين الذين يسعون لبناء مستقبلهم المهني.'
                  : 'Bab Rizq Jameel program is designed to support ambitious Saudi citizens who are looking to build their professional future.'}
              </p>

              <ul className="space-y-4 mb-10">
                {eligibility.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? item.ar : item.en}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>{language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}</span>
                <ArrowIcon className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '30px 30px',
                  }} />
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-white text-center">
                  <Heart className="w-24 h-24 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">
                    {language === 'ar' ? 'معاً نبني مستقبلاً أفضل' : 'Together We Build a Better Future'}
                  </h3>
                  <p className="text-white/70 mb-8">
                    {language === 'ar'
                      ? 'انضم إلى آلاف المستفيدين من برامجنا'
                      : 'Join thousands of beneficiaries from our programs'}
                  </p>
                  
                  {/* Impact Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <div className="text-3xl font-bold">500K+</div>
                      <div className="text-sm text-white/70">
                        {language === 'ar' ? 'مستفيد' : 'Beneficiaries'}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <div className="text-3xl font-bold">50K+</div>
                      <div className="text-sm text-white/70">
                        {language === 'ar' ? 'وظيفة' : 'Jobs'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600 relative overflow-hidden">
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
              {language === 'ar' ? 'ابدأ رحلتك معنا اليوم' : 'Start Your Journey With Us Today'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نحن هنا لمساعدتك في تحقيق أحلامك المهنية'
                : 'We are here to help you achieve your professional dreams'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-3 bg-white text-rose-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
              >
                <span>{language === 'ar' ? 'قدم طلبك' : 'Apply Now'}</span>
                <ArrowIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
