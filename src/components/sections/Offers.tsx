'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, PanInfo } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Gift,
  Percent,
  Clock,
  Star
} from 'lucide-react'

// Import local images
import Ajil1 from '@/Images/Ajil1.png'
import Ajil2 from '@/Images/Ajil2.png'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3, filled = false }: { size?: number; color?: string; strokeWidth?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M20 80 L50 20 L80 80"
        fill={filled ? `${color}20` : 'none'}
        stroke={color}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!filled && (
        <path
          d="M32 60 L68 60"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

// Large A Shape Background
function LargeAShapeBg({ className = '', opacity = 0.05 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ opacity }}>
      <defs>
        <linearGradient id="offersAGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={AJIL_BLUE} />
          <stop offset="100%" stopColor={AJIL_GOLD} />
        </linearGradient>
      </defs>
      <path
        d="M10 90 L50 10 L90 90"
        fill="none"
        stroke="url(#offersAGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 65 L75 65"
        fill="none"
        stroke="url(#offersAGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Animated A Shape
function AnimatedAShape({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1], 
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        delay,
        ease: 'easeInOut'
      }}
    >
      <MiniAShape size={60} color={AJIL_GOLD} strokeWidth={1.5} />
    </motion.div>
  )
}

const offers = [
  {
    id: 1,
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    subtitleAr: 'أول قسطين مجاناً',
    subtitleEn: 'First 2 Payments Free',
    descriptionAr: 'احصل على تمويل سيارتك الجديدة بأفضل الشروط والعروض الحصرية',
    descriptionEn: 'Get your new car financing with the best terms and exclusive offers',
    discountAr: '0% دفعة أولى',
    discountEn: '0% Down Payment',
    validAr: 'صالح حتى نهاية ديسمبر',
    validEn: 'Valid until end of December',
    image: Ajil1,
    badge: { icon: Gift, labelAr: 'عرض خاص', labelEn: 'Special Offer' },
    highlights: [
      { valueAr: '0%', valueEn: '0%', labelAr: 'رسوم إدارية', labelEn: 'Admin Fees' },
      { valueAr: '60', valueEn: '60', labelAr: 'شهر', labelEn: 'Months' },
      { valueAr: '2.9%', valueEn: '2.9%', labelAr: 'معدل سنوي', labelEn: 'APR' },
    ],
    ctaAr: 'تقدم الآن',
    ctaEn: 'Apply Now',
    href: '/apply',
  },
  {
    id: 2,
    titleAr: 'تمويل شخصي فوري',
    titleEn: 'Instant Personal Finance',
    subtitleAr: 'تحويل خلال 24 ساعة',
    subtitleEn: 'Transfer within 24 Hours',
    descriptionAr: 'تمويل نقدي سريع بدون تحويل راتب وبإجراءات سهلة وميسرة',
    descriptionEn: 'Quick cash financing without salary transfer and easy procedures',
    discountAr: 'حتى 500,000 ريال',
    discountEn: 'Up to 500,000 SAR',
    validAr: 'عرض لفترة محدودة',
    validEn: 'Limited Time Offer',
    image: Ajil2,
    badge: { icon: Clock, labelAr: 'سريع', labelEn: 'Fast' },
    highlights: [
      { valueAr: '500K', valueEn: '500K', labelAr: 'ريال', labelEn: 'SAR' },
      { valueAr: '24', valueEn: '24', labelAr: 'ساعة', labelEn: 'Hours' },
      { valueAr: '0%', valueEn: '0%', labelAr: 'كفيل', labelEn: 'Guarantor' },
    ],
    ctaAr: 'اعرف المزيد',
    ctaEn: 'Learn More',
    href: '/individuals/personal-financing',
  },
  {
    id: 3,
    titleAr: 'برنامج الولاء',
    titleEn: 'Loyalty Program',
    subtitleAr: 'مكافآت حصرية للعملاء',
    subtitleEn: 'Exclusive Rewards for Customers',
    descriptionAr: 'استمتع بمزايا حصرية ومكافآت مميزة كعميل مميز لدى أجل',
    descriptionEn: 'Enjoy exclusive benefits and special rewards as a valued AJIL customer',
    discountAr: 'خصم 50% على الرسوم',
    discountEn: '50% Off Fees',
    validAr: 'للعملاء الحاليين',
    validEn: 'For Existing Customers',
    image: Ajil1,
    badge: { icon: Star, labelAr: 'حصري', labelEn: 'Exclusive' },
    highlights: [
      { valueAr: '50%', valueEn: '50%', labelAr: 'خصم', labelEn: 'Discount' },
      { valueAr: 'VIP', valueEn: 'VIP', labelAr: 'خدمة', labelEn: 'Service' },
      { valueAr: '∞', valueEn: '∞', labelAr: 'مكافآت', labelEn: 'Rewards' },
    ],
    ctaAr: 'انضم الآن',
    ctaEn: 'Join Now',
    href: '/offers',
  },
]

export default function Offers() {
  const { t, language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % offers.length)
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length)
    setProgress(0)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Auto-play with progress
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [isAutoPlaying, nextSlide])

  // Handle drag
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      dir === 'rtl' ? nextSlide() : prevSlide()
    } else if (info.offset.x < -threshold) {
      dir === 'rtl' ? prevSlide() : nextSlide()
    }
  }

  const currentOffer = offers[currentSlide]
  const BadgeIcon = currentOffer.badge.icon

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #ffffff 0%, ${AJIL_BLUE}05 50%, #ffffff 100%)` }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large A shapes */}
        <motion.div 
          className="absolute -top-20 -right-20 w-[400px] h-[400px]"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShapeBg opacity={0.04} className="w-full h-full" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px]"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <LargeAShapeBg opacity={0.03} className="w-full h-full" />
        </motion.div>

        {/* Floating A shapes */}
        <div className="absolute top-20 left-[10%]">
          <AnimatedAShape delay={0} />
        </div>
        <div className="absolute top-40 right-[15%]">
          <AnimatedAShape delay={2} />
        </div>
        <div className="absolute bottom-32 left-[20%]">
          <AnimatedAShape delay={4} />
        </div>
        <div className="absolute bottom-20 right-[10%]">
          <AnimatedAShape delay={1} />
        </div>

        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}08 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE}08 0%, transparent 70%)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with A shape */}
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: `${AJIL_GOLD}15`, color: AJIL_BLUE }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <MiniAShape size={18} color={AJIL_GOLD} strokeWidth={2} />
            <span>{t('offers.badge')}</span>
            <Sparkles className="w-4 h-4" style={{ color: AJIL_GOLD }} />
          </motion.div>

          {/* Title with A accent */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold"
              style={{ color: AJIL_BLUE }}
            >
              {t('offers.title')}
            </h2>
            {/* A-shaped underline */}
            <svg 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-5"
              viewBox="0 0 160 20"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 18 L80 4 L160 18"
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('offers.description')}
          </motion.p>
        </motion.div>

        {/* Main Slider */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Slider Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Glowing background */}
            <div 
              className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-30"
              style={{ 
                background: `linear-gradient(135deg, ${AJIL_BLUE}30, ${AJIL_GOLD}40, ${AJIL_BLUE}30)`,
              }}
            />

            {/* Main Card */}
            <motion.div
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{ 
                boxShadow: `0 25px 80px ${AJIL_BLUE}15`,
                background: 'white',
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {/* Top A-shaped accent */}
              <div className="absolute top-0 left-0 right-0 z-20">
                <svg viewBox="0 0 1000 40" className="w-full" preserveAspectRatio="none">
                  <path d="M0,0 L1000,0 L1000,15 L750,15 L500,0 L250,15 L0,15 Z" fill={AJIL_BLUE} />
                  <path d="M350,13 L500,2 L650,13" fill="none" stroke={AJIL_GOLD} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="grid lg:grid-cols-2"
                >
                  {/* Image Side */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
                    <Image
                      src={currentOffer.image}
                      alt={language === 'ar' ? currentOffer.titleAr : currentOffer.titleEn}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Overlay gradient */}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: `linear-gradient(${dir === 'rtl' ? '90deg' : '270deg'}, transparent 0%, ${AJIL_BLUE}90 100%)`,
                      }}
                    />

                    {/* Floating A shapes on image */}
                    <motion.div 
                      className="absolute top-8 left-8"
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <MiniAShape size={50} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-12 right-12"
                      animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <MiniAShape size={40} color={AJIL_GOLD} strokeWidth={1.5} />
                    </motion.div>

                    {/* Badge */}
                    <motion.div 
                      className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
                      style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.3 }}
                    >
                      <BadgeIcon className="w-4 h-4" />
                      <span>{language === 'ar' ? currentOffer.badge.labelAr : currentOffer.badge.labelEn}</span>
                    </motion.div>

                    {/* Highlights on image (mobile) */}
                    <div className="absolute bottom-0 left-0 right-0 lg:hidden p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-around">
                        {currentOffer.highlights.map((highlight, i) => (
                          <motion.div 
                            key={i}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <div className="text-2xl font-black text-white">
                              {language === 'ar' ? highlight.valueAr : highlight.valueEn}
                            </div>
                            <div className="text-xs text-white/70">
                              {language === 'ar' ? highlight.labelAr : highlight.labelEn}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                    {/* Background A pattern */}
                    <div className="absolute top-8 right-8 opacity-[0.03]">
                      <LargeAShapeBg opacity={1} className="w-[200px] h-[200px]" />
                    </div>

                    {/* Discount tag */}
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold mb-4 self-start"
                      style={{ backgroundColor: `${AJIL_GOLD}15`, color: AJIL_GOLD }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Percent className="w-4 h-4" />
                      <span>{language === 'ar' ? currentOffer.discountAr : currentOffer.discountEn}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-3xl lg:text-4xl font-extrabold mb-2"
                      style={{ color: AJIL_BLUE }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {language === 'ar' ? currentOffer.titleAr : currentOffer.titleEn}
                    </motion.h3>

                    {/* Subtitle with A accent */}
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <MiniAShape size={20} color={AJIL_GOLD} strokeWidth={2} />
                      <span 
                        className="text-xl font-bold"
                        style={{ color: AJIL_GOLD }}
                      >
                        {language === 'ar' ? currentOffer.subtitleAr : currentOffer.subtitleEn}
                      </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                      className="text-gray-500 leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {language === 'ar' ? currentOffer.descriptionAr : currentOffer.descriptionEn}
                    </motion.p>

                    {/* Highlights (desktop) */}
                    <motion.div 
                      className="hidden lg:grid grid-cols-3 gap-4 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      {currentOffer.highlights.map((highlight, i) => (
                        <div 
                          key={i}
                          className="relative p-4 rounded-2xl text-center overflow-hidden"
                          style={{ backgroundColor: `${AJIL_BLUE}05` }}
                        >
                          {/* Mini A decoration */}
                          <div className="absolute top-2 right-2 opacity-10">
                            <MiniAShape size={24} color={AJIL_BLUE} strokeWidth={1} />
                          </div>
                          <div 
                            className="text-2xl lg:text-3xl font-black"
                            style={{ color: AJIL_BLUE }}
                          >
                            {language === 'ar' ? highlight.valueAr : highlight.valueEn}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            {language === 'ar' ? highlight.labelAr : highlight.labelEn}
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Validity */}
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-400 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{language === 'ar' ? currentOffer.validAr : currentOffer.validEn}</span>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <Link
                        href={currentOffer.href}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: AJIL_GOLD,
                          boxShadow: `0 10px 30px ${AJIL_GOLD}40`
                        }}
                      >
                        <MiniAShape size={20} color="rgba(0,0,0,0.2)" strokeWidth={2} />
                        <span className="text-gray-900">
                          {language === 'ar' ? currentOffer.ctaAr : currentOffer.ctaEn}
                        </span>
                        <ArrowIcon className="w-5 h-5 text-gray-900 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom A-wave and progress */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <svg viewBox="0 0 1000 50" className="w-full" preserveAspectRatio="none">
                  <path d="M0,50 L0,35 Q250,50 500,20 Q750,50 1000,35 L1000,50 Z" fill="white" />
                  <path d="M350,42 L500,22 L650,42" fill="none" stroke={AJIL_GOLD} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
                </svg>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <motion.div 
                    className="h-full"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: AJIL_GOLD,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={dir === 'rtl' ? nextSlide : prevSlide}
              className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110`}
              style={{ 
                backgroundColor: 'white',
                boxShadow: `0 10px 30px ${AJIL_BLUE}20`
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} style={{ color: AJIL_BLUE }} />
            </button>
            
            <button
              onClick={dir === 'rtl' ? prevSlide : nextSlide}
              className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110`}
              style={{ 
                backgroundColor: AJIL_GOLD,
                boxShadow: `0 10px 30px ${AJIL_GOLD}40`
              }}
              aria-label="Next slide"
            >
              <ChevronRight className={`w-6 h-6 text-gray-900 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Dot Navigation with A shape */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Dots */}
            <div className="flex items-center gap-3">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <motion.div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: index === currentSlide ? '48px' : '12px',
                      backgroundColor: index === currentSlide ? AJIL_GOLD : '#d1d5db',
                    }}
                  />
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: AJIL_GOLD }}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* A Shape divider */}
            <div className="flex items-center gap-3">
              <MiniAShape size={24} color={AJIL_BLUE} strokeWidth={1.5} />
            </div>

            {/* Counter */}
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold"
              style={{ backgroundColor: `${AJIL_BLUE}08`, color: AJIL_BLUE }}
            >
              <span className="text-lg" style={{ color: AJIL_GOLD }}>{currentSlide + 1}</span>
              <span className="text-gray-400">/</span>
              <span>{offers.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
