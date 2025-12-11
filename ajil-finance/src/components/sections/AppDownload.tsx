'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Smartphone,
  Check,
  Apple,
  Play,
  Shield
} from 'lucide-react'

const features = [
  { key: 'feature1', icon: '📱' },
  { key: 'feature2', icon: '💳' },
  { key: 'feature3', icon: '👤' },
  { key: 'feature4', icon: '🎁' },
]

export default function AppDownload() {
  const { t, dir } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            className={`order-2 lg:order-${dir === 'rtl' ? '2' : '1'}`}
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('app.title')}
            </h2>
            
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              {t('app.description')}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {t(`app.${feature.key}`)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl transition-colors duration-300 group"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Apple className="w-8 h-8" />
                <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-400">{t('app.download_from')}</p>
                  <p className="text-lg font-bold">{t('app.app_store')}</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl transition-colors duration-300 group"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-8 h-8" fill="currentColor" />
                <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-400">{t('app.download_from')}</p>
                  <p className="text-lg font-bold">{t('app.google_play')}</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div 
            className={`order-1 lg:order-${dir === 'rtl' ? '1' : '2'} flex justify-center`}
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl" />
              
              {/* Phone Frame */}
              <motion.div 
                className="relative w-72 md:w-80"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                  
                  {/* Screen */}
                  <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    {/* App Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      {/* Logo */}
                      <motion.div
                        className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Shield className="w-12 h-12 text-primary-600" />
                      </motion.div>
                      
                      {/* Brand Name */}
                      <h3 className="text-xl font-bold mb-2">{t('common.brand_name')}</h3>
                      <p className="text-sm text-white/70">{t('common.brand_suffix')}</p>

                      {/* Animated Dots */}
                      <div className="flex gap-2 mt-8">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-500/20 rounded-full"
                      animate={{ scale: [1.2, 1, 1.2] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Reflection */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gray-900/20 rounded-full blur-md" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl">💳</span>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -left-8 w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-xl">🚗</span>
              </motion.div>

              <motion.div
                className="absolute top-1/3 -right-6 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white shadow-lg"
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Check className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
