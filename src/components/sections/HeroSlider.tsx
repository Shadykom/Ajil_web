'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Slider data - promotional banners
const slides = [
  {
    id: 1,
    image: '/images/slide1.jpg',
    titleAr: 'عروض نهاية العام',
    titleEn: 'End of Year Offers',
    subtitleAr: 'أول قسطين علينا',
    subtitleEn: 'First Two Payments On Us',
    highlightAr: '0%',
    highlightEn: '0%',
    highlightLabelAr: 'دفعة أولى\nرسوم إدارية',
    highlightLabelEn: 'Down Payment\nAdmin Fees',
    bgColor: 'from-[#1a1a4e] via-[#2d2d6e] to-[#1a1a4e]',
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    titleAr: 'تمويل السيارات',
    titleEn: 'Car Financing',
    subtitleAr: 'احصل على سيارة أحلامك',
    subtitleEn: 'Get Your Dream Car',
    highlightAr: '2.9%',
    highlightEn: '2.9%',
    highlightLabelAr: 'معدل النسبة\nالسنوي يبدأ من',
    highlightLabelEn: 'Annual Rate\nStarting From',
    bgColor: 'from-[#0a3d62] via-[#0066b3] to-[#0a3d62]',
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    titleAr: 'تمويل شخصي',
    titleEn: 'Personal Finance',
    subtitleAr: 'حقق أهدافك المالية',
    subtitleEn: 'Achieve Your Financial Goals',
    highlightAr: '500K',
    highlightEn: '500K',
    highlightLabelAr: 'تمويل يصل إلى\nريال سعودي',
    highlightLabelEn: 'Financing Up To\nSAR',
    bgColor: 'from-[#1a365d] via-[#2c5282] to-[#1a365d]',
  },
]

export default function HeroSlider() {
  const { language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const handleNavClick = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false)
    if (direction === 'prev') {
      prevSlide()
    } else {
      nextSlide()
    }
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                       radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                  <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    {/* Text Content */}
                    <motion.div 
                      className={`text-white ${dir === 'rtl' ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
                      initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {/* Neon Title Effect */}
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-cyan-300"
                          style={{
                            textShadow: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
                            filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))',
                          }}
                        >
                          {language === 'ar' ? slide.titleAr : slide.titleEn}
                        </span>
                      </h2>
                      
                      {/* Yellow Highlight Box */}
                      <motion.div 
                        className="inline-block bg-secondary-500 text-primary-900 px-6 py-3 rounded-lg mb-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <span className="text-xl md:text-2xl font-bold">
                          {language === 'ar' ? slide.subtitleAr : slide.subtitleEn}
                        </span>
                      </motion.div>

                      {/* Highlight Stats */}
                      <motion.div 
                        className="flex items-center gap-4 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        <div className="text-6xl md:text-7xl font-bold text-secondary-400">
                          {language === 'ar' ? slide.highlightAr : slide.highlightEn}
                        </div>
                        <div className="text-lg md:text-xl text-secondary-300 whitespace-pre-line leading-tight">
                          {language === 'ar' ? slide.highlightLabelAr : slide.highlightLabelEn}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Image/Visual Side */}
                    <motion.div 
                      className={`relative ${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {/* Placeholder for car/product images */}
                      <div className="relative h-[300px] lg:h-[400px] flex items-center justify-center">
                        {/* Decorative circles */}
                        <div className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-white/10" />
                        <div className="absolute w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] rounded-full border border-white/10" />
                        <div className="absolute w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-white/5" />
                        
                        {/* AJIL Logo or Image */}
                        <div className="relative z-10 w-[180px] h-[180px] lg:w-[250px] lg:h-[250px]">
                          <Image
                            src="/images/AJIL_logo.png"
                            alt="AJIL Finance"
                            fill
                            className="object-contain opacity-80"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleNavClick('prev')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4 md:right-8' : 'left-4 md:left-8'} z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Previous slide"
        >
          <ChevronLeft className={`w-6 h-6 text-primary-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </button>
        
        <button
          onClick={() => handleNavClick('next')}
          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Next slide"
        >
          <ChevronRight className={`w-6 h-6 text-primary-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Modern Triangular Pagination - Like aljfinance.com */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Wave/Curved Shape */}
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full h-[60px] md:h-[80px]"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,120 L0,80 Q720,0 1440,80 L1440,120 Z" 
            fill="white"
          />
        </svg>
        
        {/* Triangular Pagination Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40">
          <div className="relative">
            {/* Triangle Shape */}
            <svg 
              viewBox="0 0 140 60" 
              className="w-[120px] md:w-[140px] h-[50px] md:h-[60px]"
              preserveAspectRatio="none"
            >
              {/* Main triangle pointing up */}
              <path 
                d="M70,5 L130,55 L10,55 Z" 
                fill="white"
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            </svg>
            
            {/* Navigation Controls Inside Triangle */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <div className="flex items-center gap-3">
                {/* Left Arrow */}
                <button
                  onClick={() => handleNavClick('prev')}
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Slide Number */}
                <span className="text-primary-600 font-bold text-lg min-w-[20px] text-center">
                  {currentSlide + 1}
                </span>
                
                {/* Right Arrow */}
                <button
                  onClick={() => handleNavClick('next')}
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators (below the wave) */}
      <div className="bg-white pt-2 pb-4">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-2 bg-primary-500' 
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
