'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Building, 
  Users, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Heart,
  Globe,
  CheckCircle
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const milestones = [
  {
    year: '1979',
    title: 'Foundation',
    titleAr: 'التأسيس',
    desc: 'Established as part of Abdul Latif Jameel group',
    descAr: 'تأسست كجزء من مجموعة عبداللطيف جميل',
  },
  {
    year: '1995',
    title: 'Expansion',
    titleAr: 'التوسع',
    desc: 'Expanded services across Saudi Arabia',
    descAr: 'توسعت الخدمات في جميع أنحاء المملكة',
  },
  {
    year: '2010',
    title: 'Digital Transformation',
    titleAr: 'التحول الرقمي',
    desc: 'Launched digital financing services',
    descAr: 'أطلقت خدمات التمويل الرقمية',
  },
  {
    year: '2020',
    title: 'SAMA License',
    titleAr: 'ترخيص ساما',
    desc: 'Received full financing license from SAMA',
    descAr: 'حصلت على ترخيص التمويل الكامل من ساما',
  },
  {
    year: '2024',
    title: 'Innovation',
    titleAr: 'الابتكار',
    desc: 'Leading in Sharia-compliant digital financing',
    descAr: 'الريادة في التمويل الرقمي المتوافق مع الشريعة',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    titleAr: 'العميل أولاً',
    desc: 'We put our customers at the heart of everything we do',
    descAr: 'نضع عملاءنا في قلب كل ما نقوم به',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Award,
    title: 'Excellence',
    titleAr: 'التميز',
    desc: 'We strive for excellence in every service we provide',
    descAr: 'نسعى للتميز في كل خدمة نقدمها',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Users,
    title: 'Integrity',
    titleAr: 'النزاهة',
    desc: 'We operate with honesty and transparency',
    descAr: 'نعمل بأمانة وشفافية',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Globe,
    title: 'Innovation',
    titleAr: 'الابتكار',
    desc: 'We embrace technology to serve you better',
    descAr: 'نتبنى التكنولوجيا لخدمتك بشكل أفضل',
    color: 'bg-green-100 text-green-600',
  },
]

const stats = [
  { value: '45+', label: 'Years of Experience', labelAr: 'سنة من الخبرة' },
  { value: '500K+', label: 'Happy Customers', labelAr: 'عميل سعيد' },
  { value: '30+', label: 'Branches', labelAr: 'فرع' },
  { value: '100%', label: 'Sharia Compliant', labelAr: 'متوافق مع الشريعة' },
]

const leadership = [
  {
    name: 'Mohammed Al-Jameel',
    nameAr: 'محمد الجميل',
    title: 'Chairman',
    titleAr: 'رئيس مجلس الإدارة',
    image: '/images/team/chairman.jpg',
  },
  {
    name: 'Abdullah Al-Rasheed',
    nameAr: 'عبدالله الرشيد',
    title: 'CEO',
    titleAr: 'الرئيس التنفيذي',
    image: '/images/team/ceo.jpg',
  },
  {
    name: 'Sara Al-Ghamdi',
    nameAr: 'سارة الغامدي',
    title: 'CFO',
    titleAr: 'المدير المالي',
    image: '/images/team/cfo.jpg',
  },
]

export default function OurStoryPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Our Story"
        titleAr="قصتنا"
        subtitle="Building trust and empowering dreams since 1979"
        subtitleAr="بناء الثقة وتمكين الأحلام منذ 1979"
        badge="About AJIL"
        badgeAr="عن أجيل"
        BadgeIcon={Building}
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

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar'
                  ? 'أن نكون الشريك المالي الأول والأكثر موثوقية في المملكة العربية السعودية، ملتزمين بتقديم حلول تمويلية مبتكرة ومتوافقة مع الشريعة الإسلامية.'
                  : 'To be the leading and most trusted financial partner in Saudi Arabia, committed to providing innovative and Sharia-compliant financing solutions.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar'
                  ? 'تمكين الأفراد والشركات من تحقيق أهدافهم من خلال تقديم خدمات تمويلية سلسة وشفافة وموثوقة، مع الالتزام بأعلى معايير خدمة العملاء.'
                  : 'Empowering individuals and businesses to achieve their goals by providing seamless, transparent, and reliable financing services, while maintaining the highest standards of customer service.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              <span>{language === 'ar' ? 'رحلتنا' : 'Our Journey'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'محطات مهمة' : 'Key Milestones'}
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary-200 transform -translate-x-1/2 hidden md:block" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 w-6 h-6 bg-primary-500 rounded-full transform -translate-x-1/2 hidden md:block border-4 border-white shadow-lg" />
                
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-4xl font-black text-primary-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'ar' ? milestone.titleAr : milestone.title}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'ar' ? milestone.descAr : milestone.desc}
                    </p>
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'المبادئ التي توجهنا في كل ما نقوم به'
                : 'The principles that guide us in everything we do'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${value.color} rounded-2xl flex items-center justify-center`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? value.titleAr : value.title}
                </h3>
                <p className="text-gray-500">
                  {language === 'ar' ? value.descAr : value.desc}
                </p>
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
              {language === 'ar' ? 'انضم إلى عائلة أجيل' : 'Join the AJIL Family'}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'دعنا نساعدك في تحقيق أهدافك المالية'
                : 'Let us help you achieve your financial goals'}
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
