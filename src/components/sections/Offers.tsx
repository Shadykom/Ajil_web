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
    descAr: 'استمتع بعروض تمويل حصرية على جميع موديلات تويوتا الجديدة بدون دفعة أولى',
    descEn: 'Enjoy exclusive financing offers on all new Toyota models with no down payment',
    badgeAr: 'عرض محدود',
    badgeEn: 'Limited Offer',
    image: Ajil1,
  },
  {
    id: 2,
    titleAr: 'عروض نهاية العام',
    titleEn: 'Year End Offers',
    descAr: 'أول قسطين علينا - 0% دفعة أولى - رسوم إدارية',
    descEn: 'First two installments on us - 0% down payment - Administrative fees',
    badgeAr: 'جديد',
    badgeEn: 'New',
    image: Ajil2,
  },
]

export default function Offers() {
  const { t, language, dir } = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

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
      className="relative py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 px-5 py-2 rounded-full text-sm font-semibold mb-6"
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
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
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
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Main Slider Container */}
          <div className="relative overflow-visible">
            {/* Slider with rounded top corners */}
            <div className="relative rounded-t-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[21/9] md:aspect-[3/1]"
                >
                  {/* Image - Full width banner style */}
                  <Image
                    src={offers[currentSlide].image}
                    alt={language === 'ar' ? offers[currentSlide].titleAr : offers[currentSlide].titleEn}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar with A-Shape Navigation */}
            <div className="relative">
              {/* Gold/Amber Bottom Bar */}
              <div className="h-12 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 flex items-center justify-between px-6">
                {/* Left side - Phone number */}
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <span>800 2442 211</span>
                  <span className="mx-2">|</span>
                  <span>aljfinance.com</span>
                </div>
                
                {/* Right side - Regulatory text */}
                <div className="hidden md:block text-white/80 text-xs">
                  شركة خاضعة لرقابة وإشراف البنك المركزي السعودي
                </div>
              </div>

              {/* A-Shape Navigation - Centered on top of the bar */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  {/* A-Shape White Background with Shadow */}
                  <svg 
                    viewBox="0 0 120 50" 
                    className="w-32 h-14 drop-shadow-lg"
                    fill="none"
                  >
                    <path 
                      d="M60 0 L120 50 L0 50 Z" 
                      fill="white"
                    />
                  </svg>
                  
                  {/* Navigation Controls - Positioned inside the triangle */}
                  <div className="absolute inset-0 flex items-center justify-center pt-3">
                    <div className="flex items-center gap-3">
                      {/* Previous Arrow */}
                      <button
                        onClick={dir === 'rtl' ? nextSlide : prevSlide}
                        className="group transition-all duration-300 hover:scale-110 p-1"
                        aria-label="Previous slide"
                      >
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-4 h-4 text-secondary-500 group-hover:text-secondary-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 6 L9 12 L15 18" />
                        </svg>
                      </button>
                      
                      {/* Slide Number */}
                      <span className="text-lg font-bold text-secondary-500 min-w-[20px] text-center">
                        {currentSlide + 1}
                      </span>
                      
                      {/* Next Arrow */}
                      <button
                        onClick={dir === 'rtl' ? prevSlide : nextSlide}
                        className="group transition-all duration-300 hover:scale-110 p-1"
                        aria-label="Next slide"
                      >
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-4 h-4 text-secondary-500 group-hover:text-secondary-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 6 L15 12 L9 18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-2.5 bg-primary-500 rounded-full'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
