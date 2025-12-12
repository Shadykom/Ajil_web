'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import { IconLoanProducts, AjilSymbol } from '@/components/icons'

// Import local images
import Ajil1 from '@/Images/Ajil1.jpg'
import Ajil2 from '@/Images/Ajil2.jpg'

const offers = [
  {
    id: 1,
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    image: Ajil1,
  },
  {
    id: 2,
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    image: Ajil2,
  },
]

export default function Offers() {
  const { t, language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % offers.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + offers.length) % offers.length)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <IconLoanProducts size={16} />
            <span>{t('offers.badge')}</span>
            <AjilSymbol size={16} />
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('offers.title')}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('offers.description')}
          </motion.p>
        </motion.div>

        {/* Slider */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider Container */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
            
            {/* Slider Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10">
              {/* Image Slider */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-[21/9] md:aspect-[2.5/1]"
                >
                  <Image
                    src={offers[currentSlide].image}
                    alt={language === 'ar' ? offers[currentSlide].titleAr : offers[currentSlide].titleEn}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Side Navigation Buttons */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
                {/* Previous Button */}
                <motion.button
                  onClick={dir === 'rtl' ? nextSlide : prevSlide}
                  className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white group/btn"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 md:w-6 md:h-6 text-primary-600 group-hover/btn:text-primary-700 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 6 L9 12 L15 18" />
                  </svg>
                </motion.button>

                {/* Next Button */}
                <motion.button
                  onClick={dir === 'rtl' ? prevSlide : nextSlide}
                  className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white group/btn"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 md:w-6 md:h-6 text-primary-600 group-hover/btn:text-primary-700 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6 L15 12 L9 18" />
                  </svg>
                </motion.button>
              </div>

              {/* Bottom Floating Navigation */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20">
                <motion.div 
                  className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Slide Indicators */}
                  <div className="flex items-center gap-2">
                    {offers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative group/dot"
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <motion.div
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            index === currentSlide
                              ? 'w-8 bg-gradient-to-r from-primary-500 to-primary-600'
                              : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          layoutId="activeIndicator"
                        />
                        {index === currentSlide && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary-400/50"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px h-5 bg-gray-200 mx-2" />
                  
                  {/* Slide Counter */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <span className="text-primary-600">{currentSlide + 1}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500">{offers.length}</span>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={currentSlide}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
