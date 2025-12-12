/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useMemo, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

import Ajil1 from '@/Images/Ajil1.jpg'
import Ajil2 from '@/Images/Ajil2.jpg'

type Slide = {
  src: StaticImageData
  altAr: string
  altEn: string
}

export default function PromoSlider() {
  const { language, dir } = useI18n()

  const slides: Slide[] = useMemo(
    () => [
      { src: Ajil1, altAr: 'عرض ترويجي 1', altEn: 'Promotion 1' },
      { src: Ajil2, altAr: 'عرض ترويجي 2', altEn: 'Promotion 2' },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goTo = (next: number) => {
    const normalized = ((next % slides.length) + slides.length) % slides.length
    setIndex(normalized)
    setIsAutoPlaying(false)
    window.setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    if (!isAutoPlaying) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [isAutoPlaying, slides.length])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        dir === 'rtl' ? prev() : next()
      }
      if (e.key === 'ArrowLeft') {
        dir === 'rtl' ? next() : prev()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, index])

  const alt = language === 'ar' ? slides[index]?.altAr : slides[index]?.altEn

  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full aspect-[1920/645] min-h-[240px] max-h-[70vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={slides[index].src}
                alt={alt || 'Promotion'}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Side arrows (subtle, like typical banners) */}
          <button
            type="button"
            onClick={dir === 'rtl' ? next : prev}
            aria-label={language === 'ar' ? 'السابق' : 'Previous'}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur flex items-center justify-center transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          <button
            type="button"
            onClick={dir === 'rtl' ? prev : next}
            aria-label={language === 'ar' ? 'التالي' : 'Next'}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur flex items-center justify-center transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Bottom-center controller (similar to screenshot) */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white shadow-xl px-6 py-4 rounded-t-[36px] rounded-b-[28px] flex items-center gap-4">
              <button
                type="button"
                onClick={dir === 'rtl' ? next : prev}
                aria-label={language === 'ar' ? 'السابق' : 'Previous'}
                className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>

              <div className="min-w-[44px] text-center font-bold text-primary-600" dir="ltr">
                {index + 1}
              </div>

              <button
                type="button"
                onClick={dir === 'rtl' ? prev : next}
                aria-label={language === 'ar' ? 'التالي' : 'Next'}
                className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 py-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={(language === 'ar' ? 'اذهب إلى الشريحة ' : 'Go to slide ') + (i + 1)}
              className={`transition-all ${
                i === index ? 'w-10 h-2.5 bg-primary-500 rounded-full' : 'w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>

  )
}

