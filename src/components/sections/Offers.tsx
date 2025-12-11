'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { IconLoanProducts, AjilSymbol } from '@/components/icons'
import { 
  LiquidDrop, 
  GlassyBlob 
} from '@/components/decorative/Soft3DShapes'

const offers = [
  {
    id: 1,
    titleAr: 'عروض تمويل تويوتا',
    titleEn: 'Toyota Financing Offers',
    descAr: 'استمتع بعروض تمويل حصرية على جميع موديلات تويوتا الجديدة بدون دفعة أولى',
    descEn: 'Enjoy exclusive financing offers on all new Toyota models with no down payment',
    badgeAr: 'عرض محدود',
    badgeEn: 'Limited Offer',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=600&fit=crop',
    gradient: 'from-blue-900/80 via-blue-900/60 to-transparent',
  },
  {
    id: 2,
    titleAr: 'تمويل نقدي فوري',
    titleEn: 'Instant Cash Financing',
    descAr: 'احصل على تمويل نقدي يصل إلى 500,000 ريال بموافقة خلال دقائق',
    descEn: 'Get cash financing up to 500,000 SAR with approval within minutes',
    badgeAr: 'جديد',
    badgeEn: 'New',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
    gradient: 'from-emerald-900/80 via-emerald-900/60 to-transparent',
  },
  {
    id: 3,
    titleAr: 'عروض رمضان الخاصة',
    titleEn: 'Ramadan Special Offers',
    descAr: 'احتفل معنا بشهر رمضان المبارك مع عروض تمويل استثنائية وهدايا قيّمة',
    descEn: 'Celebrate the holy month of Ramadan with exceptional financing offers and valuable gifts',
    badgeAr: 'حصري',
    badgeEn: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=600&fit=crop',
    gradient: 'from-amber-900/80 via-amber-900/60 to-transparent',
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

  const ArrowIconForward = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Soft 3D Decorative Shapes */}
      <LiquidDrop 
        className="top-[15%] left-[3%] opacity-30"
        size={140}
        delay={0.3}
      />
      <GlassyBlob 
        className="bottom-[10%] right-[5%] opacity-25"
        size={180}
        delay={0.6}
      />

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
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: dir === 'rtl' ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === 'rtl' ? 100 : -100 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[21/9]"
              >
                {/* Image */}
                <Image
                  src={offers[currentSlide].image}
                  alt={language === 'ar' ? offers[currentSlide].titleAr : offers[currentSlide].titleEn}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${offers[currentSlide].gradient}`} />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  {/* Badge */}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block w-fit bg-secondary-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold mb-4"
                  >
                    {language === 'ar' ? offers[currentSlide].badgeAr : offers[currentSlide].badgeEn}
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-2xl"
                  >
                    {language === 'ar' ? offers[currentSlide].titleAr : offers[currentSlide].titleEn}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-white/80 mb-6 max-w-xl"
                  >
                    {language === 'ar' ? offers[currentSlide].descAr : offers[currentSlide].descEn}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.a
                    href="/apply"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg w-fit transition-colors duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('offers.discover_btn')}</span>
                    <ArrowIconForward className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={dir === 'rtl' ? nextSlide : prevSlide}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={dir === 'rtl' ? prevSlide : nextSlide}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                className="h-full bg-secondary-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                key={currentSlide}
              />
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-10 h-3 bg-primary-500 rounded-full'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="hidden md:grid grid-cols-3 gap-4 mt-8">
            {offers.map((offer, index) => (
              <motion.button
                key={offer.id}
                onClick={() => goToSlide(index)}
                className={`relative rounded-xl overflow-hidden aspect-video group ${
                  index === currentSlide ? 'ring-2 ring-primary-500 ring-offset-4' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={offer.image}
                  alt={language === 'ar' ? offer.titleAr : offer.titleEn}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-black/40 ${
                  index === currentSlide ? 'bg-black/20' : 'group-hover:bg-black/30'
                } transition-colors duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base text-center px-4">
                    {language === 'ar' ? offer.titleAr : offer.titleEn}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
