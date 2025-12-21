'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Car, Banknote, Percent, Gift } from 'lucide-react'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// AJIL A Shape SVG Component
function AjilAShape({ className = '', size = 100, color = 'white', opacity = 0.1 }: { className?: string; size?: number; color?: string; opacity?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ opacity }}
    >
      <path
        d="M15 85 L50 15 L85 85"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 60 L72 60"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M32 72 L50 32 L68 72"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  )
}

// Mini A Shape for small decorations
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

// Car Illustration Component with A Shape overlay
function CarIllustration({ color = AJIL_GOLD }: { color?: string }) {
  return (
    <motion.div className="relative">
      <motion.svg 
        viewBox="0 0 400 200" 
        className="w-full max-w-md"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Car Body */}
        <motion.path
          d="M60 140 L60 110 Q60 90 80 90 L140 90 L170 60 L280 60 L310 90 L340 90 Q360 90 360 110 L360 140"
          fill={color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Windows */}
        <path
          d="M150 90 L175 65 L270 65 L290 90 Z"
          fill="rgba(255,255,255,0.3)"
        />
        <line x1="220" y1="65" x2="220" y2="90" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        {/* Wheels */}
        <circle cx="110" cy="140" r="28" fill="#1a1a1a" />
        <circle cx="110" cy="140" r="18" fill="#333" />
        <circle cx="110" cy="140" r="8" fill="#666" />
        <circle cx="310" cy="140" r="28" fill="#1a1a1a" />
        <circle cx="310" cy="140" r="18" fill="#333" />
        <circle cx="310" cy="140" r="8" fill="#666" />
        {/* Headlights */}
        <rect x="350" y="100" width="15" height="20" rx="3" fill="rgba(255,255,255,0.9)" />
        <rect x="55" y="100" width="10" height="15" rx="2" fill="rgba(255,50,50,0.9)" />
        {/* Ground reflection */}
        <ellipse cx="210" cy="175" rx="160" ry="10" fill="rgba(255,255,255,0.1)" />
      </motion.svg>
      
      {/* A Shape overlays on car body */}
      <motion.div 
        className="absolute top-1/4 left-1/3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <MiniAShape size={50} color="rgba(255,255,255,0.6)" strokeWidth={2} />
      </motion.div>
      <motion.div 
        className="absolute top-0 right-1/4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <MiniAShape size={35} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 left-1/4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <MiniAShape size={28} color={AJIL_GOLD} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  )
}

// Money/Cash Illustration with A Shape overlay
function CashIllustration({ color = AJIL_GOLD }: { color?: string }) {
  return (
    <motion.div className="relative">
      <motion.svg 
        viewBox="0 0 300 200" 
        className="w-full max-w-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Stack of money */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g 
            key={i} 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <rect 
              x={60 + i * 5} 
              y={80 - i * 15} 
              width="180" 
              height="80" 
              rx="8" 
              fill={i === 3 ? color : `rgba(255,255,255,${0.2 + i * 0.1})`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            {i === 3 && (
              <>
                {/* A Shape on the top card */}
                <path
                  d="M120 100 L150 60 L180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M130 90 L170 90"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text x="150" y="140" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">SAR</text>
              </>
            )}
          </motion.g>
        ))}
        {/* Floating coins with A shape */}
        {[
          { x: 40, y: 60, delay: 0.5 },
          { x: 260, y: 50, delay: 0.6 },
          { x: 30, y: 130, delay: 0.7 },
        ].map((coin, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, y: coin.y + 30 }}
            animate={{ scale: 1, y: coin.y }}
            transition={{ delay: coin.delay, type: 'spring' }}
          >
            <circle
              cx={coin.x}
              cy={coin.y}
              r="20"
              fill={AJIL_GOLD}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="3"
            />
            {/* Mini A on coins */}
            <path
              d={`M${coin.x - 8} ${coin.y + 8} L${coin.x} ${coin.y - 8} L${coin.x + 8} ${coin.y + 8}`}
              fill="none"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        ))}
      </motion.svg>
      
      {/* Additional A Shape overlays */}
      <motion.div 
        className="absolute top-0 right-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <MiniAShape size={40} color="rgba(255,255,255,0.5)" strokeWidth={2} />
      </motion.div>
      <motion.div 
        className="absolute bottom-1/3 left-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <MiniAShape size={32} color={AJIL_GOLD} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  )
}

// Promotional Badge
function PromoBadge({ text, icon: Icon, color = AJIL_GOLD }: { text: string; icon: React.ElementType; color?: string }) {
  return (
    <motion.div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
      style={{ backgroundColor: color, color: '#1a1a1a' }}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', delay: 0.5 }}
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </motion.div>
  )
}

// Slider data with AJIL branding
const slides = [
  {
    id: 1,
    type: 'car',
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    subtitleAr: 'أول قسطين علينا',
    subtitleEn: 'First 2 Payments On Us',
    descriptionAr: 'احصل على تمويل سيارتك الجديدة بأفضل العروض',
    descriptionEn: 'Get your new car financing with the best offers',
    highlightValue: '0%',
    highlightLabelAr: 'دفعة أولى',
    highlightLabelEn: 'Down Payment',
    highlight2Value: '0%',
    highlight2LabelAr: 'رسوم إدارية',
    highlight2LabelEn: 'Admin Fees',
    badgeAr: 'عرض محدود',
    badgeEn: 'Limited Offer',
    badgeIcon: Gift,
    ctaAr: 'تقدم الآن',
    ctaEn: 'Apply Now',
    ctaLink: '/apply',
  },
  {
    id: 2,
    type: 'car',
    titleAr: 'تمويل السيارات',
    titleEn: 'Car Financing',
    subtitleAr: 'سيارة أحلامك في انتظارك',
    subtitleEn: 'Your Dream Car Awaits',
    descriptionAr: 'تمويل مرن يناسب احتياجاتك بأقساط ميسرة',
    descriptionEn: 'Flexible financing with easy installments',
    highlightValue: '2.9%',
    highlightLabelAr: 'معدل النسبة السنوي',
    highlightLabelEn: 'Annual Rate',
    highlight2Value: '60',
    highlight2LabelAr: 'شهر فترة السداد',
    highlight2LabelEn: 'Months Tenure',
    badgeAr: 'الأكثر طلباً',
    badgeEn: 'Most Popular',
    badgeIcon: Car,
    ctaAr: 'احسب قسطك',
    ctaEn: 'Calculate',
    ctaLink: '/calculator',
  },
  {
    id: 3,
    type: 'cash',
    titleAr: 'تمويل شخصي',
    titleEn: 'Personal Finance',
    subtitleAr: 'حقق أهدافك المالية',
    subtitleEn: 'Achieve Your Goals',
    descriptionAr: 'تمويل نقدي سريع بدون تحويل راتب',
    descriptionEn: 'Quick cash financing without salary transfer',
    highlightValue: '500K',
    highlightLabelAr: 'ريال سعودي',
    highlightLabelEn: 'SAR',
    highlight2Value: '24',
    highlight2LabelAr: 'ساعة للموافقة',
    highlight2LabelEn: 'Hours Approval',
    badgeAr: 'سريع وسهل',
    badgeEn: 'Fast & Easy',
    badgeIcon: Banknote,
    ctaAr: 'اعرف المزيد',
    ctaEn: 'Learn More',
    ctaLink: '/individuals/personal-financing',
  },
]

export default function HeroSlider() {
  const { language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    pauseAutoPlay()
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const handleNavClick = (direction: 'prev' | 'next') => {
    pauseAutoPlay()
    if (direction === 'prev') {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      dir === 'rtl' ? nextSlide() : prevSlide()
      pauseAutoPlay()
    } else if (info.offset.x < -threshold) {
      dir === 'rtl' ? prevSlide() : nextSlide()
      pauseAutoPlay()
    }
  }

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight
  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Slider */}
      <motion.div 
        ref={containerRef}
        className="relative h-[480px] xs:h-[520px] sm:h-[560px] md:h-[600px] lg:h-[650px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideData.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Video Background */}
            <div className="absolute inset-0">
              {/* Fallback gradient background (shows while video loads or if video fails) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  background: `linear-gradient(135deg, ${AJIL_BLUE} 0%, ${AJIL_BLUE_LIGHT} 50%, ${AJIL_BLUE} 100%)`,
                }}
              />
              
              {/* Background Video */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover"
                poster="/videos/hero-poster.jpg"
              >
                {/* Add your video source here - supports multiple formats for browser compatibility */}
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                <source src="/videos/hero-video.webm" type="video/webm" />
              </video>
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Large A shapes */}
              <motion.div 
                className="absolute -top-20 -right-20 md:top-0 md:right-0"
                animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity }}
              >
                <AjilAShape size={400} opacity={0.08} />
              </motion.div>
              <motion.div 
                className="absolute -bottom-20 -left-20 md:bottom-0 md:left-0"
                animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 25, repeat: Infinity }}
              >
                <AjilAShape size={350} opacity={0.06} />
              </motion.div>
              
              {/* Floating A shapes */}
              <motion.div 
                className="absolute top-20 left-[10%] hidden md:block"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <AjilAShape size={80} opacity={0.15} />
              </motion.div>
              <motion.div 
                className="absolute bottom-32 right-[15%] hidden lg:block"
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <AjilAShape size={60} opacity={0.12} />
              </motion.div>

              {/* Gradient orbs with AJIL Gold */}
              <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
                style={{ background: `radial-gradient(circle, ${AJIL_GOLD}40 0%, transparent 70%)` }}
              />
              <div 
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
                style={{ background: `radial-gradient(circle, ${AJIL_GOLD}30 0%, transparent 70%)` }}
              />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
              <div className="w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* Text Content */}
                  <motion.div 
                    className={`text-white ${dir === 'rtl' ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Badge */}
                    <PromoBadge 
                      text={language === 'ar' ? currentSlideData.badgeAr : currentSlideData.badgeEn}
                      icon={currentSlideData.badgeIcon}
                    />

                    {/* Title */}
                    <motion.h1 
                      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-4 mb-3 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {language === 'ar' ? currentSlideData.titleAr : currentSlideData.titleEn}
                    </motion.h1>
                    
                    {/* Subtitle */}
                    <motion.div 
                      className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl mb-4"
                      style={{ backgroundColor: AJIL_GOLD }}
                      initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        {language === 'ar' ? currentSlideData.subtitleAr : currentSlideData.subtitleEn}
                      </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                      className="text-base sm:text-lg text-white/80 mb-6 max-w-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {language === 'ar' ? currentSlideData.descriptionAr : currentSlideData.descriptionEn}
                    </motion.p>

                    {/* Highlights */}
                    <motion.div 
                      className="flex flex-wrap gap-4 sm:gap-6 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {/* Highlight 1 */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/20">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ color: AJIL_GOLD }}>
                          {currentSlideData.highlightValue}
                        </div>
                        <div className="text-sm sm:text-base text-white/70">
                          {language === 'ar' ? currentSlideData.highlightLabelAr : currentSlideData.highlightLabelEn}
                        </div>
                      </div>
                      
                      {/* Highlight 2 */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/20">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ color: AJIL_GOLD }}>
                          {currentSlideData.highlight2Value}
                        </div>
                        <div className="text-sm sm:text-base text-white/70">
                          {language === 'ar' ? currentSlideData.highlight2LabelAr : currentSlideData.highlight2LabelEn}
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Link
                        href={currentSlideData.ctaLink}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{ 
                          backgroundColor: AJIL_GOLD,
                          color: '#1a1a1a',
                          boxShadow: `0 10px 40px ${AJIL_GOLD}40`
                        }}
                      >
                        <MiniAShape size={20} color="rgba(0,0,0,0.2)" strokeWidth={2} />
                        <span>{language === 'ar' ? currentSlideData.ctaAr : currentSlideData.ctaEn}</span>
                        <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Visual Side */}
                  <motion.div 
                    className={`hidden lg:flex relative ${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'} items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <div className="relative w-full max-w-lg">
                      {/* Glowing circle behind illustration */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div 
                          className="w-80 h-80 rounded-full"
                          style={{ 
                            background: `radial-gradient(circle, ${AJIL_GOLD}30 0%, transparent 70%)`,
                          }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </div>
                      
                      {/* Large A Shape behind illustration */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                      >
                        <AjilAShape size={300} color="white" opacity={0.08} />
                      </motion.div>
                      
                      {/* Illustration */}
                      <div className="relative z-10 flex items-center justify-center py-8">
                        {currentSlideData.type === 'car' ? (
                          <CarIllustration color={AJIL_GOLD} />
                        ) : (
                          <CashIllustration color={AJIL_GOLD} />
                        )}
                      </div>
                      
                      {/* Floating badges around illustration with A shapes */}
                      <motion.div 
                        className="absolute top-10 right-10 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="flex items-center gap-2 text-white">
                          <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
                          <span className="text-sm font-bold">0% رسوم</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-16 left-5 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      >
                        <div className="flex items-center gap-2 text-white">
                          <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
                          <span className="text-sm font-bold">عروض حصرية</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleNavClick('prev')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-2 sm:right-4' : 'left-2 sm:left-4'} z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Previous slide"
        >
          <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} style={{ color: AJIL_BLUE }} />
        </button>
        
        <button
          onClick={() => handleNavClick('next')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Next slide"
        >
          <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} style={{ color: AJIL_BLUE }} />
        </button>
      </motion.div>

      {/* Bottom Section with A-Peak Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* A-Peak Wave */}
        <svg 
          viewBox="0 0 1440 80" 
          className="w-full h-[50px] sm:h-[60px] md:h-[70px]"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,80 L0,50 Q360,70 720,25 Q1080,70 1440,50 L1440,80 Z" 
            fill="white"
          />
          {/* A accent */}
          <path 
            d="M580,62 L720,28 L860,62" 
            fill="none"
            stroke={AJIL_GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Triangular Pagination */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40">
          <div className="relative">
            <svg viewBox="0 0 120 50" className="w-[100px] sm:w-[120px] h-[40px] sm:h-[50px]">
              {/* A-shaped indicator */}
              <path d="M60,5 L110,45 L10,45 Z" fill="white" stroke="#e5e5e5" strokeWidth="1" />
              <path d="M60,12 L95,40 L25,40 Z" fill="none" stroke={AJIL_GOLD} strokeWidth="1.5" opacity="0.4" />
            </svg>
            
            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-center pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('prev')}
                  className="p-1 transition-colors"
                  style={{ color: AJIL_BLUE }}
                  aria-label="Previous"
                >
                  <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                
                <span className="font-bold text-base sm:text-lg min-w-[20px] text-center" style={{ color: AJIL_BLUE }}>
                  {currentSlide + 1}
                </span>
                
                <button
                  onClick={() => handleNavClick('next')}
                  className="p-1 transition-colors"
                  style={{ color: AJIL_BLUE }}
                  aria-label="Next"
                >
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="bg-white pt-1 pb-3 sm:pt-2 sm:pb-4">
        <div className="flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: index === currentSlide ? '32px' : '8px',
                height: '8px',
                backgroundColor: index === currentSlide ? AJIL_GOLD : '#d1d5db'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
