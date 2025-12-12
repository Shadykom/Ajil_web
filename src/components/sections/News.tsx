'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Newspaper,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Sparkles
} from 'lucide-react'

const newsArticles = [
  {
    id: 1,
    titleAr: 'أجل للتمويل تفوز بجائزتين من منشآت',
    titleEn: 'Abdul Latif Jameel Finance wins two awards from Monshaat',
    excerptAr: 'حصدت شركة أجل للتمويل جائزتين من هيئة المنشآت الصغيرة والمتوسطة تقديراً لجهودها في دعم ريادة الأعمال',
    excerptEn: 'Abdul Latif Jameel Finance has won two awards from the Small and Medium Enterprises Authority in recognition of its efforts in supporting entrepreneurship',
    category: 'awards',
    categoryLabelAr: 'جوائز وإنجازات',
    categoryLabelEn: 'Awards & Achievements',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop',
    date: '15 نوفمبر 2025',
    dateEn: 'Nov 15, 2025',
    href: '/news/awards-monshaat',
  },
  {
    id: 2,
    titleAr: 'شراكة استراتيجية مع آنت انترناشيونال لدعم المنشآت',
    titleEn: 'Strategic partnership with Ant International to support enterprises',
    excerptAr: 'أعلنت أجل للتمويل عن شراكة جديدة مع آنت انترناشيونال لتقديم حلول مالية مبتكرة',
    excerptEn: 'Abdul Latif Jameel Finance announced a new partnership with Ant International to provide innovative financial solutions',
    category: 'partnerships',
    categoryLabelAr: 'شراكات',
    categoryLabelEn: 'Partnerships',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop',
    date: '10 نوفمبر 2025',
    dateEn: 'Nov 10, 2025',
    href: '/news/ant-partnership',
  },
  {
    id: 3,
    titleAr: 'إطلاق خدمة التمويل الرقمي الفوري عبر التطبيق',
    titleEn: 'Launch of instant digital financing service via the app',
    excerptAr: 'أطلقت الشركة خدمة جديدة تتيح للعملاء الحصول على موافقة تمويلية فورية عبر التطبيق',
    excerptEn: 'The company launched a new service that allows customers to get instant financing approval through the app',
    category: 'services',
    categoryLabelAr: 'خدمات جديدة',
    categoryLabelEn: 'New Services',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    date: '5 نوفمبر 2025',
    dateEn: 'Nov 5, 2025',
    href: '/news/digital-financing',
  },
]

function NewsCard({ 
  article, 
  index,
  language,
  dir,
  t
}: { 
  article: typeof newsArticles[0]
  index: number
  language: string
  dir: string
  t: (key: string) => string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={article.image}
          alt={language === 'ar' ? article.titleAr : article.titleEn}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{language === 'ar' ? article.date : article.dateEn}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block text-secondary-500 text-sm font-bold mb-3">
          {language === 'ar' ? article.categoryLabelAr : article.categoryLabelEn}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
          {language === 'ar' ? article.titleAr : article.titleEn}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {language === 'ar' ? article.excerptAr : article.excerptEn}
        </p>

        {/* Read More Link */}
        <Link 
          href={article.href}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group/link hover:gap-4 transition-all duration-300"
        >
          <span>{t('news.read_more')}</span>
          <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
        </Link>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
    </motion.article>
  )
}

export default function News() {
  const { t, language, dir } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-5 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Newspaper className="w-4 h-4" />
            <span>{t('news.badge')}</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('news.title')}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('news.description')}
          </motion.p>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard 
              key={article.id}
              article={article}
              index={index}
              language={language}
              dir={dir}
              t={t}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg group hover:shadow-glow-md transition-all duration-300"
          >
            <span>{t('news.view_all')}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
