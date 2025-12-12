'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

// Import local images
import NewsImage1 from '@/Images/Ajil1.png'
import NewsImage2 from '@/Images/Ajil2.png'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 60 L68 60"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

// A Shape decoration
function AShapeDecoration({ className = '', size = 80, opacity = 0.1 }: { className?: string; size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={{ opacity }}>
      <path
        d="M15 85 L50 15 L85 85"
        fill="none"
        stroke={AJIL_BLUE}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 60 L72 60"
        fill="none"
        stroke={AJIL_BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 72 L50 32 L68 72"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface NewsArticle {
  id: number
  titleAr: string
  titleEn: string
  excerptAr: string
  excerptEn: string
  category: string
  categoryLabelAr: string
  categoryLabelEn: string
  image: StaticImageData
  date: string
  dateEn: string
  href: string
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    titleAr: 'أجل للتمويل تفوز بجائزتين من منشآت',
    titleEn: 'AJIL Finance wins two awards from Monshaat',
    excerptAr: 'حصدت شركة أجل للتمويل جائزتين من هيئة المنشآت الصغيرة والمتوسطة تقديراً لجهودها في دعم ريادة الأعمال',
    excerptEn: 'AJIL Finance has won two awards from the Small and Medium Enterprises Authority in recognition of its efforts in supporting entrepreneurship',
    category: 'awards',
    categoryLabelAr: 'جوائز وإنجازات',
    categoryLabelEn: 'Awards & Achievements',
    image: NewsImage1,
    date: '15 نوفمبر 2025',
    dateEn: 'Nov 15, 2025',
    href: '/news/awards-monshaat',
  },
  {
    id: 2,
    titleAr: 'شراكة استراتيجية مع آنت انترناشيونال لدعم المنشآت',
    titleEn: 'Strategic partnership with Ant International to support enterprises',
    excerptAr: 'أعلنت أجل للتمويل عن شراكة جديدة مع آنت انترناشيونال لتقديم حلول مالية مبتكرة',
    excerptEn: 'AJIL Finance announced a new partnership with Ant International to provide innovative financial solutions',
    category: 'partnerships',
    categoryLabelAr: 'شراكات',
    categoryLabelEn: 'Partnerships',
    image: NewsImage2,
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
    image: NewsImage1,
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
  t,
  featured = false
}: { 
  article: NewsArticle
  index: number
  language: string
  dir: string
  t: (key: string) => string
  featured?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  if (featured) {
    return (
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <Image
              src={article.image}
              alt={language === 'ar' ? article.titleAr : article.titleEn}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              placeholder="blur"
            />
            
            {/* Overlay with A shape */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* A Shape decoration in corner */}
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <MiniAShape size={40} color="rgba(255,255,255,0.3)" strokeWidth={2} />
              </motion.div>
            </div>

            {/* Category Badge with A shape */}
            <div 
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
            >
              <MiniAShape size={14} color="rgba(0,0,0,0.3)" strokeWidth={2} />
              <span>{language === 'ar' ? article.categoryLabelAr : article.categoryLabelEn}</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 flex flex-col justify-center relative">
            {/* Background A pattern */}
            <div className="absolute top-4 right-4 opacity-5">
              <AShapeDecoration size={120} opacity={1} />
            </div>
            
            {/* Date */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <Calendar className="w-4 h-4" style={{ color: AJIL_GOLD }} />
              <span>{language === 'ar' ? article.date : article.dateEn}</span>
            </div>

            {/* Title */}
            <h3 
              className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-[#0066b3] transition-colors duration-300"
              style={{ color: AJIL_BLUE }}
            >
              {language === 'ar' ? article.titleAr : article.titleEn}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {language === 'ar' ? article.excerptAr : article.excerptEn}
            </p>

            {/* Read More Link */}
            <Link 
              href={article.href}
              className="inline-flex items-center gap-2 font-bold text-sm group/link transition-all duration-300"
              style={{ color: AJIL_GOLD }}
            >
              <MiniAShape size={16} color={AJIL_BLUE} strokeWidth={2} />
              <span style={{ color: AJIL_BLUE }}>{t('news.read_more')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" style={{ color: AJIL_BLUE }} />
            </Link>
          </div>
        </div>

        {/* Bottom A-shaped accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <svg viewBox="0 0 400 10" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,10 L200,2 L400,10" fill={AJIL_GOLD} />
          </svg>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={language === 'ar' ? article.titleAr : article.titleEn}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          placeholder="blur"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* A Shape decoration */}
        <motion.div 
          className="absolute top-3 right-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow-lg">
            <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
          </div>
        </motion.div>

        {/* Category Badge */}
        <div 
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: AJIL_BLUE }}
        >
          {language === 'ar' ? article.categoryLabelAr : article.categoryLabelEn}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Background A shape */}
        <div className="absolute top-2 right-2 opacity-[0.03]">
          <AShapeDecoration size={80} opacity={1} />
        </div>
        
        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? article.date : article.dateEn}</span>
        </div>

        {/* Title */}
        <h3 
          className="text-base font-bold mb-3 line-clamp-2 group-hover:text-[#0066b3] transition-colors duration-300"
          style={{ color: AJIL_BLUE }}
        >
          {language === 'ar' ? article.titleAr : article.titleEn}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {language === 'ar' ? article.excerptAr : article.excerptEn}
        </p>

        {/* Read More Link */}
        <Link 
          href={article.href}
          className="inline-flex items-center gap-2 font-semibold text-sm group/link transition-all duration-300"
          style={{ color: AJIL_GOLD }}
        >
          <span>{t('news.read_more')}</span>
          <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
        </Link>
      </div>

      {/* Bottom accent with A shape */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F7941D] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  )
}

export default function News() {
  const { t, language, dir } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#f8fafc' }}
    >
      {/* Background A Shape Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative A shapes */}
        <motion.div 
          className="absolute -top-10 -right-10"
          animate={{ rotate: [0, 5, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <AShapeDecoration size={250} opacity={0.03} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-10 -left-10"
          animate={{ rotate: [0, -5, 0], y: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <AShapeDecoration size={200} opacity={0.03} />
        </motion.div>
        
        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE}08 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}08 0%, transparent 70%)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            {/* Badge with A shape */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: `${AJIL_BLUE}10`, color: AJIL_BLUE }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <MiniAShape size={18} color={AJIL_GOLD} strokeWidth={2} />
              <span>{t('news.badge')}</span>
            </motion.div>

            {/* Title with A accent */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
                style={{ color: AJIL_BLUE }}
              >
                {t('news.title')}
              </h2>
              {/* A-shaped underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-32 h-4"
                viewBox="0 0 120 15"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 12 L60 3 L120 12"
                  fill="none"
                  stroke={AJIL_GOLD}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-500 mt-6 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('news.description')}
            </motion.p>
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: AJIL_BLUE }}
            >
              <span>{t('news.view_all')}</span>
              <ChevronIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* News Grid - Featured + 2 smaller */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Featured Article */}
          <NewsCard 
            article={newsArticles[0]}
            index={0}
            language={language}
            dir={dir}
            t={t}
            featured={true}
          />
          
          {/* Smaller Articles */}
          <div className="grid gap-6">
            {newsArticles.slice(1).map((article, index) => (
              <NewsCard 
                key={article.id}
                article={article}
                index={index + 1}
                language={language}
                dir={dir}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation Dots with A shape */}
        <motion.div 
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                className="transition-all duration-300"
                style={{
                  width: dot === 0 ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: dot === 0 ? AJIL_GOLD : '#d1d5db'
                }}
              />
            ))}
          </div>
          
          {/* A Shape divider */}
          <div className="mx-4">
            <MiniAShape size={20} color={AJIL_BLUE} strokeWidth={1.5} />
          </div>
          
          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110"
              style={{ borderColor: AJIL_BLUE, color: AJIL_BLUE }}
            >
              <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
            >
              <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
