'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Car, Banknote, Building2, ArrowLeft, ArrowRight } from 'lucide-react'

// AJIL A Shape for decorations
function AjilADecoration({ size = 100, opacity = 0.1, className = '' }: { size?: number; opacity?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={{ opacity }}>
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 58 L68 58"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M35 68 L50 38 L65 68"
        fill="none"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  )
}

// Slider data - promotional banners with enhanced content
const slides = [
  {
    id: 1,
    icon: Car,
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    subtitleAr: 'أول قسطين علينا',
    subtitleEn: 'First 2 Payments On Us',
    descriptionAr: 'احصل على تمويل سيارتك الجديدة مع عروض حصرية',
    descriptionEn: 'Get your new car financing with exclusive offers',
    highlightAr: '0%',
    highlightEn: '0%',
    highlightLabelAr: 'دفعة أولى ورسوم إدارية',
    highlightLabelEn: 'Down Payment & Admin Fees',
    ctaAr: 'تقدم الآن',
    ctaEn: 'Apply Now',
    ctaLink: '/apply',
    bgGradient: 'from-[#0a1628] via-[#1a365d] to-[#0a1628]',
    accentColor: '#F7941D',
  },
  {
    id: 2,
    icon: Car,
    titleAr: 'تمويل السيارات',
    titleEn: 'Car Financing',
    subtitleAr: 'سيارة أحلامك في انتظارك',
    subtitleEn: 'Your Dream Car Awaits',
    descriptionAr: 'تمويل مرن يناسب احتياجاتك مع أقساط ميسرة',
    descriptionEn: 'Flexible financing that suits your needs',
    highlightAr: '2.9%',
    highlightEn: '2.9%',
    highlightLabelAr: 'معدل النسبة السنوي',
    highlightLabelEn: 'Annual Percentage Rate',
    ctaAr: 'احسب قسطك',
    ctaEn: 'Calculate',
    ctaLink: '/calculator',
    bgGradient: 'from-[#001a33] via-[#003366] to-[#001a33]',
    accentColor: '#22D3EE',
  },
  {
    id: 3,
    icon: Banknote,
    titleAr: 'تمويل شخصي',
    titleEn: 'Personal Finance',
    subtitleAr: 'حقق أهدافك المالية',
    subtitleEn: 'Achieve Your Goals',
    descriptionAr: 'تمويل نقدي سريع بدون تحويل راتب',
    descriptionEn: 'Quick cash financing without salary transfer',
    highlightAr: '500K',
    highlightEn: '500K',
    highlightLabelAr: 'ريال سعودي',
    highlightLabelEn: 'SAR',
    ctaAr: 'اعرف المزيد',
    ctaEn: 'Learn More',
    ctaLink: '/individuals/personal-financing',
    bgGradient: 'from-[#1a1a3e] via-[#2d2d5e] to-[#1a1a3e]',
    accentColor: '#A78BFA',
  },
]

export default function HeroSlider() {
  const { language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  // Auto-play functionality
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

  // Touch/Swipe handling
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
  const SlideIcon = currentSlideData.icon

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      {/* Slides Container */}
      <motion.div 
        ref={containerRef}
        className="relative h-[420px] xs:h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideData.id}
            className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Gradient orbs */}
              <div 
                className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full opacity-20 blur-3xl"
                style={{ background: `radial-gradient(circle, ${currentSlideData.accentColor}40 0%, transparent 70%)` }}
              />
              <div 
                className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] rounded-full opacity-15 blur-3xl"
                style={{ background: `radial-gradient(circle, ${currentSlideData.accentColor}30 0%, transparent 70%)` }}
              />
              
              {/* AJIL A Decorations */}
              <div className="absolute top-10 right-10 text-white hidden md:block">
                <AjilADecoration size={120} opacity={0.08} />
              </div>
              <div className="absolute bottom-20 left-10 text-white hidden lg:block">
                <AjilADecoration size={80} opacity={0.06} />
              </div>
              
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
              <div className="w-full">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  
                  {/* Text Content */}
                  <motion.div 
                    className={`text-white ${dir === 'rtl' ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Icon Badge */}
                    <motion.div 
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <SlideIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentSlideData.accentColor }} />
                      <span className="text-xs sm:text-sm font-medium text-white/90">
                        {language === 'ar' ? 'أجل للتمويل' : 'AJIL Finance'}
                      </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h2 
                      className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <span 
                        className="block"
                        style={{
                          textShadow: `0 0 30px ${currentSlideData.accentColor}40`,
                        }}
                      >
                        {language === 'ar' ? currentSlideData.titleAr : currentSlideData.titleEn}
                      </span>
                    </motion.h2>
                    
                    {/* Subtitle Badge */}
                    <motion.div 
                      className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl mb-4 sm:mb-6"
                      style={{ backgroundColor: currentSlideData.accentColor }}
                      initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                        {language === 'ar' ? currentSlideData.subtitleAr : currentSlideData.subtitleEn}
                      </span>
                    </motion.div>

                    {/* Description - Hidden on very small screens */}
                    <motion.p 
                      className="hidden xs:block text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6 max-w-md leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {language === 'ar' ? currentSlideData.descriptionAr : currentSlideData.descriptionEn}
                    </motion.p>

                    {/* Highlight Stats */}
                    <motion.div 
                      className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div 
                        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black"
                        style={{ color: currentSlideData.accentColor }}
                      >
                        {language === 'ar' ? currentSlideData.highlightAr : currentSlideData.highlightEn}
                      </div>
                      <div className="text-sm sm:text-base md:text-lg text-white/80 leading-tight">
                        {language === 'ar' ? currentSlideData.highlightLabelAr : currentSlideData.highlightLabelEn}
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
                        className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ 
                          backgroundColor: currentSlideData.accentColor,
                          color: '#1a1a1a',
                        }}
                      >
                        <span>{language === 'ar' ? currentSlideData.ctaAr : currentSlideData.ctaEn}</span>
                        <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Visual Side - Hidden on mobile, shown on lg+ */}
                  <motion.div 
                    className={`hidden lg:flex relative ${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'} items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <div className="relative w-[350px] h-[350px] xl:w-[400px] xl:h-[400px]">
                      {/* Animated A rings */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      >
                        <svg className="w-full h-full text-white" viewBox="0 0 400 400">
                          {[0, 72, 144, 216, 288].map((angle, i) => (
                            <g key={i} transform={`rotate(${angle} 200 200)`}>
                              <path
                                d="M185 80 L200 50 L215 80"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity={0.15 - i * 0.02}
                              />
                              <path
                                d="M190 72 L210 72"
                                fill="none"
                                stroke={currentSlideData.accentColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity={0.2 - i * 0.02}
                              />
                            </g>
                          ))}
                          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" strokeDasharray="10 10" />
                        </svg>
                      </motion.div>

                      {/* Center content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="text-center"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          {/* Large A symbol */}
                          <svg className="w-32 h-32 xl:w-40 xl:h-40 mx-auto text-white" viewBox="0 0 100 100">
                            <motion.path
                              d="M20 80 L50 15 L80 80"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            />
                            <motion.path
                              d="M30 60 L70 60"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.8, delay: 1.2 }}
                            />
                            <motion.path
                              d="M35 70 L50 35 L65 70"
                              fill="none"
                              stroke={currentSlideData.accentColor}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              transition={{ duration: 1, delay: 1 }}
                            />
                          </svg>
                          <motion.div 
                            className="mt-4 text-white/60 text-sm font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            AJIL FINANCE
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Larger touch targets on mobile */}
        <button
          onClick={() => handleNavClick('prev')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-2 sm:right-4 md:right-6' : 'left-2 sm:left-4 md:left-6'} z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95`}
          aria-label="Previous slide"
        >
          <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 text-primary-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </button>
        
        <button
          onClick={() => handleNavClick('next')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-2 sm:left-4 md:left-6' : 'right-2 sm:right-4 md:right-6'} z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95`}
          aria-label="Next slide"
        >
          <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-primary-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </button>
      </motion.div>

      {/* Modern A-Peak Pagination */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* A-Peak Wave Shape */}
        <svg 
          viewBox="0 0 1440 100" 
          className="w-full h-[50px] sm:h-[60px] md:h-[70px]"
          preserveAspectRatio="none"
        >
          {/* Main wave with A peak */}
          <path 
            d="M0,100 L0,60 Q360,80 720,30 Q1080,80 1440,60 L1440,100 Z" 
            fill="white"
          />
          {/* A accent line */}
          <path 
            d="M540,75 L720,35 L900,75" 
            fill="none"
            stroke={currentSlideData.accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>
        
        {/* Triangular Pagination Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40">
          <div className="relative">
            <svg 
              viewBox="0 0 120 50" 
              className="w-[100px] sm:w-[110px] md:w-[120px] h-[40px] sm:h-[45px] md:h-[50px]"
            >
              {/* A-shaped triangle */}
              <path 
                d="M60,8 L110,42 L10,42 Z" 
                fill="white"
                stroke="#e5e5e5"
                strokeWidth="1"
              />
              {/* Inner A accent */}
              <path 
                d="M60,15 L90,38 L30,38 Z" 
                fill="none"
                stroke={currentSlideData.accentColor}
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-center pt-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleNavClick('prev')}
                  className="text-primary-500 hover:text-primary-700 transition-colors p-1"
                  aria-label="Previous"
                >
                  <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                
                <span className="text-primary-600 font-bold text-base sm:text-lg min-w-[20px] text-center">
                  {currentSlide + 1}
                </span>
                
                <button
                  onClick={() => handleNavClick('next')}
                  className="text-primary-500 hover:text-primary-700 transition-colors p-1"
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
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-6 sm:w-8 h-1.5 sm:h-2' 
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 hover:bg-gray-400'
              }`}
              style={{
                backgroundColor: index === currentSlide ? currentSlideData.accentColor : '#d1d5db'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
